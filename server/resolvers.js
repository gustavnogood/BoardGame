// resolvers.js

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

      // Use Prisma to create a new game record in the database
      const newGame = await prisma.game.create({
        data: {
          name,
          category,
          numberOfPlayers,
          time,
        },
      });

      // Return the list of all games after creating the new one
      const updatedGamesList = await prisma.game.findMany();
      return updatedGamesList;
    },
    createUser: async (_, { input }) => {
      const { name } = input;

      // Use Prisma to create a new user record in the database
      const newUser = await prisma.user.create({
        data: {
          name,
        },
      });

      // Return the list of all users after creating the new one
      const updatedUsersList = await prisma.user.findMany();
      return updatedUsersList;
    },

/*     createEvent: async (_, { input }) => {
      const { date, invitedFriends, selectedGames } = input;
      const dateId = await prisma.date.create({
        data: {
          date
        }
      }).id;
  
      // Create a new event record in the database using Prisma
      const newEvent = await prisma.event.create({
        data: {
          dateId,
          date,
          invitedFriends: {
            connect: invitedFriends.map(friendId => ({ id: friendId })),
          },
          selectedGames: {
            connect: selectedGames.map(gameId => ({ id: gameId })),
          },
        },
        include: {
          invitedFriends: true,
          selectedGames: true,
        },
      });
  
      return newEvent;
    }, */
  },
};

export default resolvers;
