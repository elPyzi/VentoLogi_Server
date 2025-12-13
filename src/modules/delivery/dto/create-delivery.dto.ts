import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateDeliveryDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  start: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDate()
  finish: Date;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  totalCost?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  transportId?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  companyId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  dockId: number;
}
