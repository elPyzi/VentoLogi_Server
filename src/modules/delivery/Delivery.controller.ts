import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  ParseIntPipe,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { DeliveryService } from './Delivery.service';
import { DELIVERY_MODULE_ENDPOINTS } from './constants';
import { JwtAuthGuard, RolesGuard } from '@shared/guards';
import { CreateDeliveryDto, UpdateDeliveryDto } from './dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller(DELIVERY_MODULE_ENDPOINTS.BASIC)
export class DeliveryController {
  constructor(private readonly DeliveryService: DeliveryService) {}

  @Get(DELIVERY_MODULE_ENDPOINTS.GET_DELIVERY)
  async getDelivery(@Param('id', ParseIntPipe) deliveryId: number) {
    return await this.DeliveryService.getDelivery(deliveryId);
  }

  @Get(DELIVERY_MODULE_ENDPOINTS.GET_DELIVERIES)
  async getDeliveries() {
    return this.DeliveryService.getDeliveries();
  }

  @Post(DELIVERY_MODULE_ENDPOINTS.CREATE_DELIVERY)
  @HttpCode(HttpStatus.CREATED)
  async createDelivery(@Body() createDeliveryDto: CreateDeliveryDto) {
    return await this.DeliveryService.createDelivery(createDeliveryDto);
  }

  @Put(DELIVERY_MODULE_ENDPOINTS.UPDATE_DELIVERY)
  async updateDelivery(
    @Body() updateDeliveryDto: UpdateDeliveryDto,
    @Param('id', ParseIntPipe) deliveryId: number,
  ) {
    return await this.DeliveryService.updateDelivery(
      updateDeliveryDto,
      deliveryId,
    );
  }

  @Delete(DELIVERY_MODULE_ENDPOINTS.DELETE_DELIVERY)
  async deleteDelivery(@Param('id', ParseIntPipe) deliveryId: number) {
    return await this.DeliveryService.deleteDelivery(deliveryId);
  }
}
