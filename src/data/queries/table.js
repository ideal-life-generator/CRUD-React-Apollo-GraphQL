import {
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLString,
} from 'graphql';
import chalk from 'chalk';
import RowType from '../types/Row';
import neo4j from '../neo4j';

export default {
  type: new GraphQLNonNull(new GraphQLList(RowType)),
  args: {
    orderBy: {
      type: new GraphQLInputObjectType({
        name: 'OrderBy',
        fields: {
          property: {
            type: GraphQLString,
            defaultValue: 'name',
          },
          direction: {
            type: GraphQLString,
            defaultValue: 'ASC',
          },
        },
      }),
    },
  },
  async resolve(source, { orderBy: { property, direction } }) {
    try {
      const session = neo4j.session();

      const { records } = await session.run(`
        MATCH (row:Row)
        RETURN
          ID(row) AS id,
          row.name AS name
        ORDER BY row.${property} ${direction}
      `);

      session.close();

      const table = records.map((record) => {
        const {
          id,
          name,
        } = record.toObject();

        return {
          id,
          name,
        };
      });

      return table;
    } catch (error) {
      console.error(chalk.red(error));

      throw error;
    }
  },
};
