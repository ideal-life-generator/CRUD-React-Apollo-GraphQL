import { combineReducers } from 'redux';
import client from '../client';
import video from './video';

export default combineReducers({
  apollo: client.reducer(),
  video,
});
