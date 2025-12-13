import { Injectable } from '@nestjs/common';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { PrismaService } from '@shared/modules';
import { BASE_RATE_WEIGHT, PRODUCT_TYPE_COEFFICIENTS } from './constants';
import { ProductType } from './types';

@Injectable()
export class OrdersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllOrders(id: number) {
    return this.prismaService.orders.findMany({ where: { id } });
  }

  async getOrder(userId: number, orderId: number) {
    return this.prismaService.orders.findFirst({
      where: {
        id: orderId,
        userId,
      },
    });
  }

  async create(createOrderDto: CreateOrderDto, userId: number) {
    const calculatedCost = await this.calculateOrderPrice(
      createOrderDto.weight,
      createOrderDto.productType,
    );

    // await this.prismaService.orders.create({
    //   data: {
    //     userId,
    //     name: createOrderDto.name,
    //     weight: createOrderDto.weight,
    //     productTypeId: createOrderDto.productType,
    //     statusId: ORDER_STATUSES.CREATED,
    //     cost: createOrderDto.cost ?? calculatedCost,
    //     finish_at: createOrderDto.finishAt ?? null,
    //     created_at: new Date(),
    //     priority: createOrderDto.priority ?? PRIORITY.MINOR,
    //   },
    // });
  }

  async updateOrder(updateOrderDto: UpdateOrderDto, orderId: number) {
    await this.prismaService.orders.update({
      where: { id: orderId },
      data: {
        name: updateOrderDto.name,
        weight: updateOrderDto.weight,
        finish_at: updateOrderDto.finishAt,
        cost: updateOrderDto.cost,
        ...(updateOrderDto.orderStatus !== undefined && {
          status_id: updateOrderDto.orderStatus,
        }),
      },
    });
  }

  async calculateOrderPrice(weight: number, productType: ProductType) {
    const coefficient = PRODUCT_TYPE_COEFFICIENTS[productType];

    return weight * BASE_RATE_WEIGHT * coefficient;
  }
}
