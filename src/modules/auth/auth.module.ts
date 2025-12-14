import { Module } from '@nestjs/common';
import { AuthService, AuthController } from '@modules/auth';
import { JwtStrategy, LocalStrategy } from '@shared/strategies';
import { UsersModule } from '@/modules';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
