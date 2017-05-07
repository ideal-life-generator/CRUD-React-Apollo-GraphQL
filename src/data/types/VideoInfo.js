import {
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLNonNull,
} from 'graphql';

export default new GraphQLObjectType({
  name: 'VideoInfo',
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    lengthSeconds: {
      type: new GraphQLNonNull(GraphQLInt),
    },
    imageUrl: {
      type: new GraphQLNonNull(GraphQLString),
    },
    views: {
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
});
