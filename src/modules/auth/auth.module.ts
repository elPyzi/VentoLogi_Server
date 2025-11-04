import { Module } from '@nestjs/common';
import { UsersModule } from '@modules/users';
import { AuthService, AuthController } from '@modules/auth';
import { JwtStrategy, LocalStrategy } from '@shared/strategies';

@Module({
  imports: [UsersModule],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
