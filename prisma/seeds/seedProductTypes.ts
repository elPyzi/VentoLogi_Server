import { PrismaClient } from '@prisma/client';

export const seedProductType = async (prisma: PrismaClient) => {
  try {
    const productType = await prisma.productType.createMany({
      data: [
        { name: 'GLASS' },
        { name: 'METAL' },
        { name: 'PLASTIC' },
        { name: 'WOOD' },
        { name: 'CERAMIC' },
        { name: 'TEXTILE' },
        { name: 'PAPER' },
        { name: 'COMPOSITE' },
        { name: 'LIQUID' },
        { name: 'OTHER' },
      ],
    });

    console.log('created seedProductType', productType);
  } catch (error) {
    console.error('Error creating productType', error);
  }
};
