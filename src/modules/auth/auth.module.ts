import { Module } from '@nestjs/common';
import { AuthService, AuthController } from '@modules/auth';
import { JwtStrategy, LocalStrategy } from '@shared/strategies';
import { UsersModule } from '@/modules';

@Module({
  imports: [UsersModule],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
