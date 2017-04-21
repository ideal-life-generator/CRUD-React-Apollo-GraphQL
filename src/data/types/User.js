import {
  GraphQLNonNull,
  GraphQLBoolean,
  GraphQLString,
  GraphQLObjectType,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'User',
  fields: {
    isAuthorized: {
      type: new GraphQLNonNull(GraphQLBoolean),
    },
    username: {
      type: GraphQLString,
    },
  },
});
