import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ProductType } from '@modules/orders/types';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  weight: number;

  @IsOptional()
  @IsNumber()
  cost?: number;

  @IsOptional()
  @IsDate()
  finishAt?: Date;

  @IsNotEmpty()
  productType: ProductType;
}
