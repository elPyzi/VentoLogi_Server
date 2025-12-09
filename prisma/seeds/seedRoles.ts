import { PrismaClient } from '@prisma/client';

export const seedRoles = async (prisma: PrismaClient) => {
  try {
    const roles = await prisma.roles.createMany({
      data: [
        { name: 'SHIPPER' },
        { name: 'ADMIN' },
        { name: 'PILOT' },
        { name: 'OPERATOR' },
      ],
    });

    console.log('Created Roles', roles);
  } catch (error) {
    console.error('Error creating Roles', error);
  }
};
