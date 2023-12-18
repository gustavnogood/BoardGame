import { PrismaClient } from '@prisma/client';

export async function runPrismaTest() {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    const newUser = await prisma.user.create({
      data: {
        name: 'Alice',
        image: 'https://cdn.iconscout.com/icon/free/png-512/free-profile-1439375-1214445.png?f=webp&w=256',
      },
    });
    console.log(newUser);
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}