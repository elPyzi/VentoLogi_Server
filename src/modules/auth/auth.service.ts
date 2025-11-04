import type { CreateUserDto } from '@modules/users/dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { MailService, RedisService } from '@shared/modules';
import { AuthLoginDto, VerifyUserDto } from '@modules/auth/dto';
import { UsersService } from '@/modules/users';
import { DAY, FIVE_MINUTES, REDIS_KEY } from '@shared/constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TToken } from '@shared/models';
import { generateCode } from '@/utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registerInit(createUserDto: CreateUserDto) {
    const isUserExist = await this.usersService.findByEmail(
      createUserDto.email,
    );

    if (isUserExist) {
      throw new BadRequestException('User already exists');
    }

    const code = await generateCode(6);

    await this.redisService.setValue(
      REDIS_KEY.REGISTER_USER(createUserDto.email),
      JSON.stringify(createUserDto),
      FIVE_MINUTES,
    );

    await this.redisService.setValue(
      REDIS_KEY.REGISTER_CODE(createUserDto.email),
      code,
      FIVE_MINUTES,
    );

    await this.mailService.sendVerificationCode(createUserDto.email, code);
  }

  async registerVerify(verifyInfo: VerifyUserDto) {
    const user = await this.redisService.getValue<CreateUserDto>(
      REDIS_KEY.REGISTER_USER(verifyInfo.email),
    );
    const cashedCode = await this.redisService.getValue<number>(
      REDIS_KEY.REGISTER_CODE(verifyInfo.email),
    );

    if (cashedCode !== verifyInfo.code) {
      throw new ConflictException();
    }

    if (!user) {
      throw new InternalServerErrorException();
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    await this.usersService.createUser({
      fullName: user.fullName,
      email: user.email,
      login: user.login,
      password: hashedPassword,
      phoneNumber: user.phoneNumber,
      avatar: user.avatar,
      clientType: user.clientType,
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) throw new NotFoundException();

    const isMatchPasswords = await bcrypt.compare(password, user.password);

    if (!isMatchPasswords) throw new UnauthorizedException();

    const { password: usersPassword, ...result } = user;

    return result;
  }

  async login(user: AuthLoginDto) {
    const payload: TToken = { id: user.id, email: user.email, role: user.role };
    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    await this.redisService.setValue(refreshToken, refreshToken, DAY);

    return { accessToken, refreshToken };
  }

  async logout(payload: TToken) {
    await this.redisService.deleteKey(REDIS_KEY.TOKEN(payload.id));
  }

  async refresh(refreshToken: string) {
    const isRefreshTokenExist =
      await this.redisService.getValue<string>(refreshToken);
    if (!isRefreshTokenExist) throw new UnauthorizedException();

    const payload: TToken = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });

    return { accessToken };
  }
}
