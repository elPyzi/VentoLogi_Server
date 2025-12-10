import { CreateOrderDto } from './create-order.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsNumber, IsOptional } from 'class-validator';
import { OrderStatusesType } from '@modules/orders/types';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  orderStatus?: OrderStatusesType;
}
