import express from 'express';
import path from 'path';
import homepageRouter from './homepageRouter.js';
import assetsRouter from './assetsRouter.js';
import { ApolloServer } from 'apollo-server-express';
import resolvers from './resolvers.js';
import { readFileSync } from 'fs';
import { makeExecutableSchema } from '@graphql-tools/schema';
//import { runPrismaTest } from './prismaTest.js';
import cors from 'cors';



const publicPath = path.join(path.resolve(), 'public');
const distPath = path.join(path.resolve(), 'dist');

const typeDefs = readFileSync('./server/schema.graphql', 'utf-8');

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const server = new ApolloServer({
  schema,
});

async function startServer() {
  await server.start();
  const app = express();

  app.use(cors({
    origin: 'http://localhost:5173',  // Update with your frontend URL
    credentials: true,
  }));

  if (process.env.NODE_ENV === 'production') {
    app.use('/', express.static(distPath));
  } else {
    app.use('/', express.static(publicPath));
    app.use('/src', assetsRouter);
  }

  app.use(express.json());

  app.post('/api/v1/saveDateToPostgres', async (req, res) => {
    try { // Extract the date from the request body
      const { date } = req.body;
  
      // Handle Prisma logic here
      // Example: Save the date to the database using PrismaClient
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
  
      await prisma.$connect();
  
      const newDate = await prisma.date.create({
        data: {
          date: date,
        },
      });
  
      await prisma.$disconnect();
  
      res.json({ message: 'Date saved to PostgreSQL', data: newDate });
      // Your existing logic for saving date to PostgreSQL
    } catch (error) {
      console.error('Error saving date to PostgreSQL', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.use(homepageRouter);

  server.applyMiddleware({ app });

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log('Server listening on port', port);
  });
}

//runPrismaTest();

startServer().catch((error) => {
  console.error('Error starting server:', error);
});
