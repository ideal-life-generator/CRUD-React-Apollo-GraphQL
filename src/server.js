import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import chalk from 'chalk';
import schema from './data/schema';
import { graphQLPort } from './config';

const app = express();

app.use(cors());

app.use('/graphql', graphqlHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));

app.listen(graphQLPort, () => console.info(chalk.green(`GraphQL server is listening on localhost:${graphQLPort}`)));
