import {
  Injectable,
  InternalServerErrorException,
  UseGuards,
} from '@nestjs/common';
import { PrismaService } from '@shared/modules';
import { CreateUserDto } from '@/modules/users';
import { ROLES } from '@shared/constants';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async createUser(user: CreateUserDto) {
    const createdUser = await this.prismaService.users.create({
      data: {
        full_name: user.fullName,
        email: user.email,
        login: user.login,
        password: user.password,
        phone: user.phoneNumber,
        avatar: user.avatar,
        client_type: user.clientType,
        role_id: ROLES.SHIPPER,
      },
    });

    if (!createdUser) {
      throw new InternalServerErrorException();
    }
  }

  async me(id: number) {
    const createdUser = await this.prismaService.users.findFirst({
      where: {
        id,
      },
    });

    if (!createdUser) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findByEmail(email: string) {
    return this.prismaService.users.findFirst({
      where: {
        email,
      },
    });
  }
}
