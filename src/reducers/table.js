import { combineReducers } from 'redux';
import createAction from './utils/create-action';
import createReducer from './utils/create-reducer';

export const setOrderProperty = createAction('TABLE_ORDER_SET_PROPERTY_NAME');

const normalOrderDirection = 'ASC';
const reverseOrderDirection = 'DESC';

export const setNormalOrderDirection = createAction('TABLE_ORDER_SET_NORMAL_DIRECTION');
export const setReverseOrderDirection = createAction('TABLE_ORDER_SET_REVERSE_DIRECTION');

export const changeOrder = property => (dispatch, getState) => {
  const state = getState();

  if (state.table.order.property === property) {
    if (state.table.order.direction === normalOrderDirection) {
      dispatch(setReverseOrderDirection());
    } else {
      dispatch(setNormalOrderDirection());
    }
  } else {
    dispatch(setOrderProperty(property));

    dispatch(setNormalOrderDirection());
  }
};

const order = createReducer({
  property: 'name',
  direction: normalOrderDirection,
}, {
  [setOrderProperty.type]: property => ({
    property,
  }),
  [setNormalOrderDirection.type]: () => ({
    direction: normalOrderDirection,
  }),
  [setReverseOrderDirection.type]: () => ({
    direction: reverseOrderDirection,
  }),
});

export const setName = createAction('TABLE_CREATE_SET_INPUT');

const create = createReducer({
  name: '',
}, {
  [setName.type]: name => ({
    name,
  }),
});

export default combineReducers({
  order,
  create,
});
