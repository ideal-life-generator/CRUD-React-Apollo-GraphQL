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
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(cookieSession({
  keys: ['mix of the drink', 'another mix of the drink :DD'],
}));

app.use((req, res, next) => {
  req.session.isAuthorized = true;

  console.log(req.cookies);

  console.log(req.session);

  next();
});

app.use('/graphql', graphqlHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));

app.listen(graphQLPort, () => console.info(chalk.green(`GraphQL server is listening on localhost:${graphQLPort}`)));
