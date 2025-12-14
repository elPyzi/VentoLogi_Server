import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RefundPaymentDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentIntentId: string;
}
