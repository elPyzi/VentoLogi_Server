import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePaymentLinkDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  priceId: string;
}
