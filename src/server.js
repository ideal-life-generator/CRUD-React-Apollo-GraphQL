import express from 'express';
import expressSession from 'express-session';
import sessionFileStore from 'session-file-store';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import chalk from 'chalk';
import schema from './data/schema';
import { graphQLPort } from './config';

const app = express();

const FileStore = sessionFileStore(expressSession);

app.use(expressSession({
  resave: false,
  saveUninitialized: true,
  secret: 'mix of the drink',
  cookie: { secure: true },
  store: new FileStore(),
}));

app.use(cors());

app.use((req, res, next) => {
  req.session.x = 1;

  next();
});

app.use('/graphql', graphqlHTTP({
  schema,
  pretty: true,
  graphiql: true,
}));

app.listen(graphQLPort, () => console.info(chalk.green(`GraphQL server is listening on localhost:${graphQLPort}`)));
