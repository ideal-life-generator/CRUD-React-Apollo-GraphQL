import { GraphQLSchema } from 'graphql';
import Root from './Root';

export default new GraphQLSchema({
  query: Root,
});
