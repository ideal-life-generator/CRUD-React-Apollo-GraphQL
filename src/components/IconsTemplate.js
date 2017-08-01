import React, { Component, PropTypes } from 'react';
import styles from './IconsTemplate.scss';

const { string, number, shape, element, arrayOf, oneOfType } = PropTypes;

export default class IconsTemplate extends Component {
  static propTypes = {
    children: oneOfType([element, arrayOf(element)]).isRequired,
    size: oneOfType([string, number]).isRequired,
    viewBox: shape({
      width: number.isRequired,
      height: number.isRequired,
    }).isRequired,
  };

  render() {
    const { props: { children, size, viewBox: { width, height } } } = this;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
        width={size}
        height={size}
        className={styles.iconsTemplate}
      >
        {children}
      </svg>
    );
  }
}
