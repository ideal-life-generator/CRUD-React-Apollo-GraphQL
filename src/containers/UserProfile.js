import React, { Component } from 'react';
import { bool, string, shape } from 'prop-types';
import { gql, graphql } from 'react-apollo';

@graphql(gql`
  query {
    user {
      isAuthorized,
      username,
    }
  }
`)

export default class UserProfile extends Component {
  static propTypes = {
    data: shape({
      user: shape({
        isAuthorized: bool.isRequired,
        username: string,
      }),
    }).isRequired,
  };

  render() {
    const { props: { data } } = this;

    if (data.networkStatus === 1) {
      return <div>Loading</div>;
    }

    if (data.user.isAuthorized) {
      return (
        <div>
          {data.user.username}
        </div>
      );
    }

    return (
      <div>Login</div>
    );
  }
}
