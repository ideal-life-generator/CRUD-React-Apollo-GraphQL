import { GraphQLObjectType } from 'graphql';

import user from './queries/user';
import videoInfo from './queries/video-info';

export default new GraphQLObjectType({
  name: 'Root',
  fields: {
    user,
    videoInfo,
  },
});
