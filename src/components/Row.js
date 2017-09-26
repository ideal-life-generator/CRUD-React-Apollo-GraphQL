import React, { Component } from 'react';
import { string, func } from 'prop-types';

export default class Row extends Component {
  static propTypes = {
    id: string.isRequired,
    name: string.isRequired,
    deleteRow: func.isRequired,
  };

  onDelete = () => {
    const {
      props: {
        id,
        deleteRow,
      },
    } = this;

    deleteRow(id);
  };

  render() {
    const {
      onDelete,
      props: {
        id,
        name,
      },
    } = this;

    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>
          <button
            onClick={onDelete}
          >
            delete
          </button>
        </td>
      </tr>
    );
  }
}
