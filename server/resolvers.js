
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
    createGame: async (_, { input }) => {
      const { name, category, numberOfPlayers, time } = input;


      const newGame = await prisma.game.create({
        data: {
          name,
          category,
          numberOfPlayers,
          time,
        },
      });


      const updatedGamesList = await prisma.game.findMany();
      return updatedGamesList;
    },
    createUser: async (_, { input }) => {
      const { name } = input;


      const newUser = await prisma.user.create({
        data: {
          name,
        },
      });


      const updatedUsersList = await prisma.user.findMany();
      return updatedUsersList;
    },


  },
};

export default resolvers;
