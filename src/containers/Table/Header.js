import React, { Component } from 'react';
import { string, func } from 'prop-types';

export default class Header extends Component {
  static propTypes = {
    property: string.isRequired,
    changeOrder: func.isRequired,
  };

  onChangeOrder = () => {
    const {
      props: {
        property,
        changeOrder,
      },
    } = this;

    changeOrder(property);
  };

  render() {
    const {
      onChangeOrder,
      props: {
        property,
      },
    } = this;

    return (
      <th
        onClick={onChangeOrder}
      >
        {property}
      </th>
    );
  }
}
