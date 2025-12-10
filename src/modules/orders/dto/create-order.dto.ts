import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductType } from '@modules/orders/types';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  cost?: number;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  finishAt?: Date;

  @ApiProperty()
  @IsNotEmpty()
  productType: ProductType;
}
