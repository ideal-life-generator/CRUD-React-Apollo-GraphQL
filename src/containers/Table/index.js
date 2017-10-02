import React, { Component } from 'react';
import { string, func, shape, arrayOf } from 'prop-types';
import { compose, graphql } from 'react-apollo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import * as queries from '../../queries/table';
import Header from './Header';
import Row from './Row';
import * as actions from '../../reducers/table';
import styles from './index.jss';

@injectSheet(styles)

@connect(({
  table: {
    order,
    create,
  },
}) => ({
  order,
  create,
}), dispatch => bindActionCreators({
  changeOrder: actions.changeOrder,
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
    props: props => ({
      ...props,
      rawData: props.data,
      data: props.data,
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
    classes: shape({
      table: string.isRequired,
    }).isRequired,
    create: shape({
      name: string.isRequired,
    }).isRequired,
    data: shape({
      table: arrayOf(shape({
        id: string.isRequired,
        name: string.isRequired,
      })),
    }).isRequired,
    changeOrder: func.isRequired,
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

  renderRows = () => {
    const {
      props: {
        data,
      },
    } = this;

    if (data.loading) {
      return (
        <tr>
          <td
            colSpan="3"
          >
            loading
          </td>
        </tr>
      );
    }

    if (data.error) {
      return (
        <tr>
          <td
            colSpan="3"
          >
            {data.error.message}
          </td>
        </tr>
      );
    }

    console.log(Object.keys(data.table[0]));

    return (
      data.table.map(row => (
        <Row
          key={row.id}
          {...row}
          deleteRow={this.props.deleteRow}
        />
      ))
    );
  };

  render() {
    const {
      props,
    } = this;

    // console.log(props.data);

    return (
      <table className={props.classes.table}>
        <thead>
          <tr>
            {['id', 'name'].map(property => (
              <Header
                key={property}
                property={property}
                changeOrder={props.changeOrder}
              />
            ))}
            <th />
          </tr>
        </thead>
        <tbody>
          {this.renderRows()}
          <tr>
            <td />
            <td>
              <input
                type="text"
                placeholder="Enter name"
                value={props.create.name}
                onChange={this.onEnterName}
              />
            </td>
            <td>
              <button
                onClick={this.onCreate}
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
