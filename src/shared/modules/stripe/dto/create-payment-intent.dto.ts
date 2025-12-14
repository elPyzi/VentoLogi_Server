import { IsInt, IsOptional, IsPositive, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Currency, PaymentMethodId } from '@shared/modules/stripe/constants';

export class CreatePaymentIntentDto {
  @ApiProperty()
  @IsInt()
  @IsPositive()
  amount: number;

  @ApiProperty({ enum: Currency })
  @IsString()
  currency: Currency;

  @ApiProperty({ enum: PaymentMethodId, required: false })
  @IsOptional()
  @IsString()
  paymentMethodId?: PaymentMethodId;
}
