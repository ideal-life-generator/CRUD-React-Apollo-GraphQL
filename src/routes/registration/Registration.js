import React, { Component } from 'react';

export default class Registration extends Component {
  render() {
    return (
      <div>
        <h3>Registration</h3>
        <form>
          <div>
            <input
              type="text"
              placeholder="Username"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
