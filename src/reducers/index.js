import { combineReducers } from 'redux';
import client from '../client';
import search from './search';

export default combineReducers({
  apollo: client.reducer(),
  search,
});
