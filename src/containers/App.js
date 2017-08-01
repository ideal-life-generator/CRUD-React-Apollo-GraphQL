import React, { Component } from 'react';
import { bool } from 'prop-types';
// import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import UserProfile from './UserProfile';
import Search from './Search';
import InputInfo from './InputInfo';
// import Registration from '../routes/registration/Registration';
import styles from './App.scss';

// @withStyles(styles)

@connect(({ search: { videoId } }) => ({ inputInfoShowed: typeof videoId === 'string' }))

export default class App extends Component {
  static propTypes = {
    inputInfoShowed: bool.isRequired,
  };

  render() {
    return (
      <div className={styles.app}>
        <main className={styles.main}>
          <Search />
          <section>
            {this.props.inputInfoShowed && <InputInfo />}
            {/*<Route
              path="/registration"
              component={Registration}
            />*/}
          </section>
        </main>
        {/*<UserProfile />*/}
        <nav>
          {/*<Link to="/registration">Registration</Link>*/}
        </nav>
      </div>
    );
  }
}
