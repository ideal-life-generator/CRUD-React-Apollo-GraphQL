import React, { Component } from 'react';
import { bool } from 'prop-types';
// import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
// import UserProfile from './UserProfile';
import Input from './Input';
import InputInfo from './InputInfo';
// import Registration from '../routes/registration/Registration';
import styles from './App.scss';

// @withStyles(styles)

@connect(({ video: { url } }) => ({ inputInfoShowed: typeof url === 'string' }))

export default class App extends Component {
  static propTypes = {
    inputInfoShowed: bool.isRequired,
  };

  render() {
    return (
      <main className={styles.main}>
        <aside>
          <Input />
        </aside>
        {/*<UserProfile />*/}
        <nav>
          {/*<Link to="/registration">Registration</Link>*/}
        </nav>
        <section>
          {this.props.inputInfoShowed && <InputInfo />}
          {/*<Route
            path="/registration"
            component={Registration}
          />*/}
        </section>
      </main>
    );
  }
}
