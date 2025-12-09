import { PrismaClient } from '@prisma/client';
import { seedRoles, seedStatuses, seedTransport, seedUsers } from './seeds';

const prisma = new PrismaClient();

const seed = async () => {
  await seedRoles(prisma);
  await seedStatuses(prisma);
  await seedUsers(prisma);
  await seedTransport(prisma);
};

seed()
  .catch((err) => {
    console.log('Error wit creating common data in db, error: ', err);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());
