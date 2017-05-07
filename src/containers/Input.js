import React, { Component } from 'react';
import { string, func } from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import * as videoAction from '../reducers/video';
import styles from './Input.scss';

// @withStyles(styles)

@connect(({ video: { url } }) => ({ url }), dispatch => bindActionCreators({
  setVideoUrl: videoAction.setUrl,
}, dispatch))

export default class Input extends Component {
  static propTypes = {
    url: string,
    setVideoUrl: func.isRequired,
  };

  onInput = ({ target: { value } }) => {
    if (value) {
      this.props.setVideoUrl(value);
    }
  };

  render() {
    return (
      <div>
        <input
          className={styles.input}
          type="text"
          placeholder="Pass a link"
          value={this.props.url || ''}
          onInput={this.onInput}
        />
      </div>
    );
  }
}
