import React, { Component } from 'react';
import { string, func, shape, arrayOf } from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as queries from '../queries/table';
import Row from '../components/Row';
import * as actions from '../reducers/table';
import styles from './Table.scss';

@connect(({
  table: {
    order,
    create,
  },
}) => ({
  order,
  create,
}), dispatch => bindActionCreators({
  setName: actions.setName,
}, dispatch))

@compose(
  graphql(queries.table, {
    options: ({ order: { property, direction } }) => ({
      variables: {
        orderProperty: property,
        orderDirection: direction,
      },
    }),
  }),
  graphql(queries.createRow, {
    props: ({
      ownProps: {
        order: { property, direction },
        create: { name },
      },
      mutate,
    }) => ({
      createRow: () => mutate({
        variables: {
          name,
        },
        refetchQueries: [{
          query: queries.table,
          variables: {
            orderProperty: property,
            orderDirection: direction,
          },
        }],
      }),
    }),
  }),
  graphql(queries.deleteRow, {
    props: ({
      ownProps: {
        order: { property, direction },
      },
      mutate,
    }) => ({
      deleteRow: id => mutate({
        variables: {
          id,
        },
        refetchQueries: [{
          query: queries.table,
          variables: {
            orderProperty: property,
            orderDirection: direction,
          },
        }],
        optimisticResponse: {
          __typename: 'Mutation',
          deleteRow: {
            __typename: 'Row',
            id,
          },
        },
        update: (store, { data: { deleteRow } }) => {
          const data = store.readQuery({
            query: queries.table,
            variables: {
              orderProperty: property,
              orderDirection: direction,
            },
          });

          data.table = data.table.filter(row => row.id !== deleteRow.id);

          store.writeQuery({
            query: queries.table,
            variables: {
              orderProperty: property,
              orderDirection: direction,
            },
            data,
          });
        },
      }),
    }),
  }),
)

export default class Table extends Component {
  static propTypes = {
    create: shape({
      name: string.isRequired,
    }).isRequired,
    data: shape({
      table: arrayOf(shape({
        id: string.isRequired,
        name: string.isRequired,
      })),
    }).isRequired,
    setName: func.isRequired,
    createRow: func.isRequired,
    deleteRow: func.isRequired,
  };

  onEnterName = ({ target: { value } }) => {
    const {
      props: {
        setName,
      },
    } = this;

    setName(value);
  };

  onCreate = () => {
    const {
      props: {
        createRow,
        setName,
      },
    } = this;

    createRow();

    setName('');
  };

  renderLoading = () => {
    return (
      <tr>
        <td
          colSpan="3"
        >
          loading
        </td>
      </tr>
    );
  };

  renderContent = () => {
    return (
      this.props.data.table.map(row => (
        <Row
          key={row.id}
          {...row}
          deleteRow={this.props.deleteRow}
        />
      ))
    );
  };

  renderError = () => {
    return (
      <tr>
        <td
          colSpan="3"
        >
          {this.props.data.error.message}
        </td>
      </tr>
    );
  };

  renderRows = () => {
    const {
      props: {
        data,
      },
    } = this;

    if (data.loading) {
      return this.renderLoading();
    }

    if (data.error) {
      return this.renderError();
    }

    return this.renderContent();
  };

  render() {
    const {
      renderRows,
      onEnterName,
      onCreate,
      props: {
        create,
      },
    } = this;

    return (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>id</th>
            <th>name</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {renderRows()}
          <tr>
            <td />
            <td>
              <input
                type="text"
                placeholder="Enter name"
                value={create.name}
                onChange={onEnterName}
              />
            </td>
            <td>
              <button
                onClick={onCreate}
              >
                create
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
