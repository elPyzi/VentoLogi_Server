import { Module } from '@nestjs/common';
import { OrdersService } from './Orders.service';
import { OrdersController } from './Orders.controller';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
