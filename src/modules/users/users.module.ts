import { Module } from '@nestjs/common';
import { UsersController, UsersService } from '@/modules/users';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
