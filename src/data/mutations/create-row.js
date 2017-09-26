import {
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';
import chalk from 'chalk';
import RowType from '../types/Row';
import neo4j from '../neo4j';

export default {
  type: RowType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  async resolve(source, { name }) {
    try {
      const session = neo4j.session();

      const { records: [record] } = await session.run(`
        CREATE (row:Row { name: "${name}" })
        RETURN
          ID(row) AS id,
          row.name AS name
      `);

      session.close();

      return record.toObject();
    } catch (error) {
      console.error(chalk.red(error));

      throw error;
    }
  },
};
