import { Module } from '@nestjs/common';
import { OrdersService } from './Orders.service';
import { OrdersController } from './Orders.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '@shared/strategies';

@Module({
  imports: [PassportModule],
  controllers: [OrdersController],
  providers: [OrdersService, JwtStrategy],
})
export class OrdersModule {}
