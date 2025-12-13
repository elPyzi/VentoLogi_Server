import { PrismaClient } from '@prisma/client';

export const seedDocks = async (prisma: PrismaClient) => {
  try {
    const docks = await prisma.docks.createMany({
      data: [
        {
          name: 'МНК-Док',
          geo_point: { lat: 53.9023, lng: 27.5619 },
          city: 'Minsk',
          phone: '375296230731',
        },
        {
          name: 'SuperBerlin',
          geo_point: { lat: 52.52, lng: 13.405 },
          city: 'Berlin',
          phone: '4930123456',
        },
        {
          name: 'Dock Moscow',
          geo_point: { lat: 55.7558, lng: 37.6176 },
          city: 'Moscow',
          phone: '74951234567',
        },
        {
          name: 'Warsaw Main Dock',
          geo_point: { lat: 52.2297, lng: 21.0122 },
          city: 'Warsaw',
          phone: '48221234567',
        },
        {
          name: 'Vilnius Dock',
          geo_point: { lat: 54.6872, lng: 25.2797 },
          city: 'Vilnius',
          phone: '37061234567',
        },
      ],
    });

    console.log('created docks', docks);
  } catch (error) {
    console.error('Error creating docks', error);
  }
};
