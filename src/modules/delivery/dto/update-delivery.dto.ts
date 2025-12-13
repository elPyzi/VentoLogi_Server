import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateDeliveryDto } from './create-delivery.dto';
import { DELIVERY_STATUSES } from '../constants';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {
  @ApiProperty()
  @IsOptional()
  statusId?: DELIVERY_STATUSES;
}
