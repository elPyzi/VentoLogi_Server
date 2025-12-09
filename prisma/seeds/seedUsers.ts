import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const seedUsers = async (prisma: PrismaClient) => {
  try {
    const hashedAdminPassword = await bcrypt.hash('admin', 10);
    const hashedShipperPassword = await bcrypt.hash('shipper', 10);
    const hashedPilotPassword = await bcrypt.hash('pilot', 10);
    const hashedOperatorPassword = await bcrypt.hash('operator', 10);

    const users = await prisma.users.createMany({
      data: [
        {
          login: 'admin',
          email: 'admin@gmail.com',
          full_name: 'Eva Administrator',
          password: hashedAdminPassword,
          role_id: 2,
        },
        {
          login: 'shipperI',
          email: 'shipperI@gmail.com',
          full_name: 'User Oleg',
          password: hashedShipperPassword,
          client_type: 'individual',
          role_id: 1,
        },
        {
          login: 'shipperL',
          email: 'shipperL@gmail.com',
          full_name: 'User Oleg',
          password: hashedShipperPassword,
          client_type: 'legal',
          role_id: 1,
        },
        {
          login: 'pilot',
          email: 'pilot@gmail.com',
          full_name: 'Pilot Some',
          password: hashedPilotPassword,
          role_id: 3,
        },
        {
          login: 'operator',
          email: 'operator@gmail.com',
          full_name: 'Operator Ivan',
          password: hashedOperatorPassword,
          role_id: 4,
        },
      ],
    });

    console.log('created users', users);
  } catch (error) {
    console.error('Error creating users', error);
  }
};
