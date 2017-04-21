import {
  GraphQLObjectType,
} from 'graphql';

import user from './queries/user';

export default new GraphQLObjectType({
  name: 'Root',
  fields: {
    user,
  },
});
