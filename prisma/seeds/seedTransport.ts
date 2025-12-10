import { PrismaClient } from '@prisma/client';

const transports = [
  {
    name: 'Astra-900',
    type: 'Airship',
    capacity_kg: 15000,
    length: 120,
    width: 30,
    height: 35,
    speed: 90,
    fuel_type: 'helium-hybrid',
    fuel_consumption: 18,
    status: 'available',
  },
  {
    name: 'Nimbus-X4',
    type: 'Airship',
    capacity_kg: 22000,
    length: 150,
    width: 40,
    height: 40,
    speed: 110,
    fuel_type: 'hydrogen-hybrid',
    fuel_consumption: 22,
    status: 'maintenance',
  },
  {
    name: 'SkyLift-300',
    type: 'Airship',
    capacity_kg: 9000,
    length: 95,
    width: 25,
    height: 28,
    speed: 80,
    fuel_type: 'helium',
    fuel_consumption: 14,
    status: 'available',
  },
  {
    name: 'Zephyr-XL',
    type: 'Airship',
    capacity_kg: 30000,
    length: 180,
    width: 50,
    height: 55,
    speed: 130,
    fuel_type: 'hydrogen',
    fuel_consumption: 30,
    status: 'in_flight',
  },
  {
    name: 'Voyager-Helios',
    type: 'Airship',
    capacity_kg: 17000,
    length: 135,
    width: 38,
    height: 42,
    speed: 100,
    fuel_type: 'helium-hybrid',
    fuel_consumption: 20,
    status: 'available',
  },
];

export const seedTransport = async (prisma: PrismaClient) => {
  await prisma.transports.createMany({
    data: transports,
  });
};
