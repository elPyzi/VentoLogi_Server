import { CreateOrderDto } from './create-order.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { OrderStatusesType } from '@modules/orders/types';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @IsNumber()
  @IsOptional()
  orderStatus?: OrderStatusesType;
}
