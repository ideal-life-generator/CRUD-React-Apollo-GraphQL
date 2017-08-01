import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import IconsCross from '../components/Icons/Cross';
import * as seacrhActions from '../reducers/search';
import styles from './Search.scss';

// @withStyles(styles)

@connect(({ search: { input } }) => ({ input }), dispatch => bindActionCreators({
  setInput: seacrhActions.setValue,
  clear: seacrhActions.clear,
}, dispatch))

export default class Search extends Component {
  static propTypes = {
    input: string,
    setInput: func.isRequired,
    clear: func.isRequired,
  };

  onInputHandler = ({ target: { value } }) => {
    this.props.setInput(value);
  };

  render() {
    return (
      <div className={styles.search}>
        <input
          type="text"
          placeholder="Pass youtube link"
          className={styles.input}
          value={this.props.input}
          onInput={this.onInputHandler}
        />
        <div
          className={styles.clearContainer}
          onClick={this.props.clear}
        >
          <IconsCross size="10" />
        </div>
      </div>
    );
  }
}
