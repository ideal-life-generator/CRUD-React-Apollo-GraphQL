import React, { Component } from 'react';
import { bool, string, func, shape, arrayOf, oneOf } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Header from './Header';
import Row from './Row';
import * as tableInterface from '../../reducers/table';
import styles from './index.jss';

@injectSheet(styles)

@connect(({
  table: {
    data,
    create,
  },
}) => ({
  data,
  create,
}), dispatch => bindActionCreators({
  get: tableInterface.get,
  changeOrder: tableInterface.changeOrder,
  setName: tableInterface.setName,
}, dispatch))

export default class Table extends Component {
  static propTypes = {
    // classes: shape({
    //   table: string.isRequired,
    // }).isRequired,
    // create: shape({
    //   name: string.isRequired,
    // }).isRequired,
    data: shape({
      isFething: bool.isRequired,
      table: arrayOf(shape({
        id: string.isRequired,
        name: string.isRequired,
      })),
      orderProperty: string.isRequired,
      orderDirection: oneOf([tableInterface.normalOrderDirection, tableInterface.reverseOrderDirection]).isRequired,
      error: string,
    }).isRequired,
    get: func.isRequired,
    // changeOrder: func.isRequired,
    setName: func.isRequired,
    // createRow: func.isRequired,
    // deleteRow: func.isRequired,
  };

  async componentDidMount() {
    const {
      props: {
        data: {
          orderProperty,
          orderDirection,
        },
      },
    } = this;

    await this.props.get({ orderProperty, orderDirection });
  }

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

    return (
      data.table.map(row => (
        <Row
          key={row.id}
          {...row}
          // deleteRow={this.props.deleteRow}
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
