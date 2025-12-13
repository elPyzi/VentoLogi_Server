import { Module } from '@nestjs/common';
import { DeliveryService } from './Delivery.service';
import { DeliveryController } from './Delivery.controller';

@Module({
  controllers: [DeliveryController],
  providers: [DeliveryService],
})
export class DeliveryModule {}
