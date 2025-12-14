import {
  Controller,
  Get,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
  InternalServerErrorException,
  Body,
  Req,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { OrdersService } from './Orders.service';
import { ORDERS_MODULE_ENDPOINTS } from './constants';
import { JwtAuthGuard, RolesGuard } from '@shared/guards';
import { Request as ERequest } from 'express';
import { Roles } from '@shared/decorators';
import { ROLES } from '@shared/constants';
import { CreateOrderDto, UpdateOrderDto } from './dto';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(ROLES.SHIPPER, ROLES.ADMIN)
@Controller(ORDERS_MODULE_ENDPOINTS.BASIC)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post(ORDERS_MODULE_ENDPOINTS.CREATE_ORDER)
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateOrderDto, @Req() req: ERequest) {
    console.log('error here: ', req.token);
    if (!req.token) {
      throw new InternalServerErrorException();
    }

    return await this.ordersService.create(dto, req.token.id);
  }

  @Get(ORDERS_MODULE_ENDPOINTS.GET_ORDERS)
  @HttpCode(HttpStatus.OK)
  async getAllOrders(@Request() req: ERequest) {
    if (!req.token) {
      throw new InternalServerErrorException();
    }

    return this.ordersService.getAllOrders(req.token.id);
  }

  @Get(ORDERS_MODULE_ENDPOINTS.GET_ORDERS)
  @HttpCode(HttpStatus.OK)
  async getOrder(
    @Request() req: ERequest,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    if (!req.token) {
      throw new InternalServerErrorException();
    }

    return await this.ordersService.getOrder(req.token.id, orderId);
  }

  @Put(ORDERS_MODULE_ENDPOINTS.UPDATE_ORDER)
  @HttpCode(HttpStatus.OK)
  async updateOrder(
    @Body() updateOrderDto: UpdateOrderDto,
    @Param('id', ParseIntPipe) orderId: number,
  ) {
    return await this.ordersService.updateOrder(updateOrderDto, orderId);
  }
}
