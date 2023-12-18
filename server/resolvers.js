import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const resolvers = {
  Query: {
    users: async () => {
      return prisma.user.findMany();
    },
    games: async () => {
      return prisma.game.findMany();
    },
  },
  Mutation: {
    saveDateToPostgres: async (_, { date }) => {
      return prisma.date.create({
        data: {
          date: date,
        },
      });
    },
  },
};

export default resolvers;