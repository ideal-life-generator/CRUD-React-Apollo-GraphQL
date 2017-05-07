import { createStore, applyMiddleware, compose } from 'redux';
// import { autoRehydrate } from 'redux-persist';
import client from './client';
import reducers from './reducers';

export default createStore(reducers, undefined, compose(
  applyMiddleware(client.middleware()),
  // autoRehydrate(),
));
