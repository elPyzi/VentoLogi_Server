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
import { MailService, PrismaService, RedisService } from '@shared/modules';
import { AuthLoginDto, VerifyUserDto } from '@modules/auth/dto';
import { UsersService } from '@/modules/users';
import { DAY, FIVE_MINUTES, REDIS_KEY } from '@shared/constants';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TToken } from '@shared/models';
import { generateCode } from '@/utils';
import { ResetPasswordDto } from '@modules/auth/dto/reset-password.dto';
import { ResetPasswordInitDto } from '@modules/auth/dto/resetPasswordInit.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly redisService: RedisService,
    private readonly mailService: MailService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
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

    await this.mailService.sendVerificationCode(
      createUserDto.email,
      code,
      'Подтверждение регистрации',
    );
  }

  async registerVerify(verifyInfo: VerifyUserDto) {
    console.log(verifyInfo);
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

  async login(authLoginDto: AuthLoginDto) {
    const user = await this.prismaService.users.findFirst({
      where: { email: authLoginDto.email },
    });

    if (!user) {
      throw new NotFoundException();
    }

    const payload: TToken = {
      id: user.id,
      email: user.email,
      role: user.role_id,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '7d',
    });

    await this.redisService.setValue(refreshToken, refreshToken, DAY);

    const { password: usersPassword, ...result } = user;

    return { accessToken, refreshToken, result };
  }

  async logout(payload: TToken) {
    await this.redisService.deleteKey(REDIS_KEY.TOKEN(payload.id));
  }

  async refresh(refreshToken: string) {
    const isRefreshTokenExist =
      await this.redisService.getValue<string>(refreshToken);
    if (!isRefreshTokenExist)
      throw new UnauthorizedException('refresh token is not exist');

    const payload: TToken = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
    });

    const { iat, exp, ...userPayload } = payload;

    const accessToken = await this.jwtService.signAsync(userPayload, {
      secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
      expiresIn: '15m',
    });

    return { accessToken };
  }

  async resetPasswordInit(resetPasswordInitDto: ResetPasswordInitDto) {
    const isUserExist = await this.prismaService.users.findFirst({
      where: { email: resetPasswordInitDto.email },
    });

    if (!isUserExist) {
      throw new NotFoundException();
    }

    const code = await generateCode(6);

    await this.redisService.setValue(
      REDIS_KEY.RESET_PASSWORD_EMAIL(resetPasswordInitDto.email),
      resetPasswordInitDto.email,
      FIVE_MINUTES,
    );

    await this.redisService.setValue(
      REDIS_KEY.RESET_PASSWORD_CODE(resetPasswordInitDto.email),
      code,
      FIVE_MINUTES,
    );

    await this.mailService.sendVerificationCode(
      resetPasswordInitDto.email,
      code,
      'Подтверждение сброса пароля',
    );
  }

  async resetPasswordVerify(verifyInfo: VerifyUserDto) {
    const cashedCode = await this.redisService.getValue<number>(
      REDIS_KEY.RESET_PASSWORD_EMAIL(verifyInfo.email),
    );

    if (cashedCode !== verifyInfo.code) {
      throw new ConflictException();
    }
  }

  async resetPassword(resetPasswordInitDto: ResetPasswordDto) {
    const hashedPassword = await bcrypt.hash(resetPasswordInitDto.password, 10);

    await this.usersService.updatePasswordByEmail(
      hashedPassword,
      resetPasswordInitDto.email,
    );
  }
}
