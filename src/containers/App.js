import React, { Component } from 'react';
import Table from './Table';
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './App.scss';

// @withStyles(styles)

export default class App extends Component {
  render() {
    return (
      <div className={styles.app}>
        <main className={styles.main}>
          <header>
            <h1>crud</h1>
          </header>
          <section>
            <Table />
          </section>
        </main>
      </div>
    );
  }
}
