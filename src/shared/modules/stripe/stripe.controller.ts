import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { JwtAuthGuard } from '@shared/guards';
import { STRIPE_MODULE_ENDPOINTS } from '@shared/modules/stripe/constants';

import {
  CreatePaymentIntentDto,
  CreateSubscriptionDto,
  CreateCustomerDto,
  CreateProductDto,
  RefundPaymentDto,
  CreatePaymentLinkDto,
} from './dto';

@UseGuards(JwtAuthGuard)
@Controller(STRIPE_MODULE_ENDPOINTS.BASIC)
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @Get(STRIPE_MODULE_ENDPOINTS.PRODUCTS)
  getProducts() {
    return this.stripeService.getProducts();
  }

  @Get(STRIPE_MODULE_ENDPOINTS.CUSTOMERS)
  getCustomers() {
    return this.stripeService.getCustomers();
  }

  @Post(STRIPE_MODULE_ENDPOINTS.CREATE_PAYMENT_INTENT)
  createPaymentIntent(@Body() dto: CreatePaymentIntentDto) {
    return this.stripeService.createPaymentIntent(dto.amount, dto.currency);
  }

  @Post(STRIPE_MODULE_ENDPOINTS.SUBSCRIPTIONS)
  createSubscription(@Body() dto: CreateSubscriptionDto) {
    return this.stripeService.createSubscription(dto.customerId, dto.priceId);
  }

  @Post(STRIPE_MODULE_ENDPOINTS.CUSTOMERS)
  createCustomer(@Body() dto: CreateCustomerDto) {
    return this.stripeService.createCustomer(dto.email, dto.name);
  }

  @Post(STRIPE_MODULE_ENDPOINTS.PRODUCTS)
  createProduct(@Body() dto: CreateProductDto) {
    return this.stripeService.createProduct(
      dto.name,
      dto.description,
      dto.price,
    );
  }

  @Post(STRIPE_MODULE_ENDPOINTS.REFUNDS)
  refundPayment(@Body() dto: RefundPaymentDto) {
    return this.stripeService.refundPayment(dto.paymentIntentId);
  }

  @Post(STRIPE_MODULE_ENDPOINTS.PAYMENT_LINKS)
  createPaymentLink(@Body() dto: CreatePaymentLinkDto) {
    return this.stripeService.createPaymentLink(dto.priceId);
  }

  @Get(STRIPE_MODULE_ENDPOINTS.BALANCE)
  getBalance() {
    return this.stripeService.getBalance();
  }
}
