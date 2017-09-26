import { combineReducers } from 'redux';
import createAction from './utils/create-action';
import createReducer from './utils/create-reducer';

export const setName = createAction('TABLE_SET_INPUT');

const order = createReducer({
  property: 'name',
  direction: 'DESC',
}, {});

const create = createReducer({
  name: '',
}, {
  [setName.type]: name => ({
    name,
  }),
});

export default combineReducers({
  create,
  order,
});
