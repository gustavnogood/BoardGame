import { PrismaClient } from '@prisma/client';

export async function runPrismaTest() {
  const prisma = new PrismaClient();

  try {
    await prisma.$connect();
    const newGame = await prisma.game.create({
      data: {
        name: 'Pandemic',
        category:  'Cooperative',
        numberOfPlayers: 4,
        time: '60min',
        
      },
    });
    console.log(newGame);
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}