import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import asyncActionMiddleware from './middlewares/async-action';
// import { autoRehydrate } from 'redux-persist';
import reducers from '../reducers';

export default createStore(reducers, undefined, compose(
  applyMiddleware(
    thunk,
    asyncActionMiddleware,
  ),
));
