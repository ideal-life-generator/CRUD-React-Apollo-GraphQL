import {
  GraphQLNonNull,
  GraphQLID,
} from 'graphql';
import chalk from 'chalk';
import RowType from '../types/Row';
import neo4j from '../neo4j';

export default {
  type: RowType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  },
  async resolve(source, { id }) {
    try {
      const session = neo4j.session();

      const { records: [record] } = await session.run(`
        MATCH (row:Row)
        WHERE ID(row) = ${id}
        DELETE row
        RETURN
          ID(row) AS id
      `);

      session.close();

      if (record) {
        return record.toObject();
      }

      throw new Error(`Row with id ${id} not available`);
    } catch (error) {
      console.error(chalk.red(error));

      throw error;
    }
  },
};
