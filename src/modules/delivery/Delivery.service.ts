import { Injectable } from '@nestjs/common';
import { PrismaService } from '@shared/modules';
import { CreateDeliveryDto, UpdateDeliveryDto } from '@/modules/delivery/dto';
import { DELIVERY_STATUSES } from '@/modules/delivery/constants';

@Injectable()
export class DeliveryService {
  constructor(private readonly prismaService: PrismaService) {}

  async getDelivery(deliveryId: number) {
    return this.prismaService.delivery.findFirst({
      where: {
        id: deliveryId,
      },
    });
  }

  async getDeliveries() {
    return this.prismaService.delivery.findMany();
  }

  async createDelivery(createDeliveryDto: CreateDeliveryDto) {
    return this.prismaService.delivery.create({
      data: {
        statusId: DELIVERY_STATUSES.CREATED,
        ...createDeliveryDto,
      },
    });
  }

  async updateDelivery(
    updateDeliveryDto: UpdateDeliveryDto,
    deliveryId: number,
  ) {
    return this.prismaService.delivery.update({
      where: { id: deliveryId },
      data: updateDeliveryDto,
    });
  }

  async deleteDelivery(deliveryId: number) {
    return this.prismaService.delivery.delete({ where: { id: deliveryId } });
  }
}
