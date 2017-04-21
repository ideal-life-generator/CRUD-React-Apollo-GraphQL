import { GraphQLNonNull } from 'graphql';
import UserType from '../types/User';
import neo4j from '../neo4j';

export default {
  type: new GraphQLNonNull(UserType),
  async resolve(parentValue, _, { session: { isAuthorized } }) {
    try {
      const session = neo4j.session();

      const { records: [me] } = await session.run(`
        MATCH (me:User { username: "ideallifegenerator" })
        RETURN
          me.username AS username
      `);

      session.close();

      return {
        isAuthorized,
        username: me.get('username'),
      };
    } catch (error) {
      throw error;
    }
  },
};
