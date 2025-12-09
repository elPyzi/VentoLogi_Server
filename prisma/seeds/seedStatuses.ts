import { PrismaClient } from '@prisma/client';

export const seedStatuses = async (prisma: PrismaClient) => {
  try {
    const orderStatuses = await prisma.orderStatuses.createMany({
      data: [
        { name: 'CREATED' },
        { name: 'IN PROGRESS' },
        { name: 'DELETED' },
        { name: 'CANCELED' },
      ],
    });

    const deliveryStatuses = await prisma.deliveryStatuses.createMany({
      data: [
        { name: 'CREATED' },
        { name: 'IN PROGRESS' },
        { name: 'DELETED' },
        { name: 'CANCELED' },
      ],
    });

    console.log('created orderStatuses', orderStatuses);
    console.log('created deliveryStatuses', deliveryStatuses);
  } catch (error) {
    console.error('Error creating statuses', error);
  }
};
