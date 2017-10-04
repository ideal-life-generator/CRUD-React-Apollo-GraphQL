// import { createHmac } from 'crypto';
import express from 'express';
import cors from 'cors';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import graphqlHTTP from 'express-graphql';
import chalk from 'chalk';
import schema from './data/schema';
import { graphQLPort } from './config';

const app = express();

app.use(cookieParser());

app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:8000'],
  credentials: true,
}));

app.use(cookieSession({
  keys: ['mix of the drink', 'another mix of the drink :DD'],
}));

app.use(({ session }, res, next) => {
  Object.assign(session, {
    // isAuthorized: true,
    // hash: createHmac('sha256', 'haha').digest('hex'),
  });

  next();
});

app.use(graphqlHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));

app.listen(graphQLPort, () => console.info(chalk.green(`GraphQL server is listening on localhost:${graphQLPort}`)));
