import React, { Component } from 'react';
import { bool, string, number, shape } from 'prop-types';
import { connect } from 'react-redux';
import { gql, graphql } from 'react-apollo';

@connect(({ search: { videoId } }) => ({ videoId }))

@graphql(gql`
  query ($videoId: String!) {
    videoInfo(videoId: $videoId) {
      title,
      lengthSeconds,
      imageUrl,
      views,
    }
  }
`)

export default class InputInfo extends Component {
  static propTypes = {
    data: shape({
      loading: bool.isRequired,
      error: shape({
        message: string.isRequired,
      }),
      videoInfo: shape({
        title: string.isRequired,
        lengthSeconds: number.isRequired,
        imageUrl: string.isRequired,
        views: number.isRequired,
      }),
    }).isRequired,
  };

  render() {
    const { props: { data: { loading, error, videoInfo } } } = this;

    if (loading) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>{error.message}</div>;
    }

    return (
      <div>
        <br />
        {/*<h5>{videoInfo.title}</h5>*/}
        <img src={videoInfo.imageUrl} alt={videoInfo.title} />
        {/*<p>
          <span>{(videoInfo.lengthSeconds / 60).toFixed(0)}m {videoInfo.lengthSeconds % 60}s</span>
          &nbsp;
          <span>{videoInfo.views} views</span>
        </p>*/}
      </div>
    );
  }
}
