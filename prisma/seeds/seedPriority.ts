import { PrismaClient } from '@prisma/client';

export const seedPriority = async (prisma: PrismaClient) => {
  try {
    const priority = await prisma.priority.createMany({
      data: [
        {
          type: 'MINOR',
        },
        {
          type: 'MAJOR',
        },
        {
          type: 'CRITICAL',
        },
      ],
    });

    console.log('created priority', priority);
  } catch (error) {
    console.error('Error creating priority', error);
  }
};
