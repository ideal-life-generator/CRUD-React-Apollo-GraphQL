import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import { autoRehydrate } from 'redux-persist';
import client from './client';
import reducers from './reducers';

export default createStore(reducers, undefined, compose(
  applyMiddleware(client.middleware()),
  applyMiddleware(thunk),
  // autoRehydrate(),
));
