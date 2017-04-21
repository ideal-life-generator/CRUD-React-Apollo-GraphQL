import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import UserProfile from './UserProfile';
import Registration from '../routes/registration/Registration';

export default class App extends Component {
  render() {
    return (
      <div>
        <UserProfile />
        <nav>
          <Link to="/registration">Registration</Link>
        </nav>
        <section>
          <Route
            path="/registration"
            component={Registration}
          />
        </section>
      </div>
    );
  }
}
