import { combineReducers } from 'redux';
import client from '../client';
import table from './table';

export default combineReducers({
  apollo: client.reducer(),
  table,
});
