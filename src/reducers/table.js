import { combineReducers } from 'redux';
import { CancelToken } from 'axios';
import createAction from './utils/create-action';
import createAsyncAction from './utils/create-async-action';
import createReducer from './utils/create-reducer';
import axios from '../utils/axios';

const generateGetTableQuery = ({ orderProperty, orderDirection }) => `
  query {
    table(orderBy: { property: "${orderProperty}", direction: "${orderDirection}" }) {
      id,
      name,
    }
  }
`;

export const get = createAsyncAction('TABLE_GET', async ({ orderProperty, orderDirection }, { cancelable, cache }) => {
  try {
    const GET_TABLE_QUERY = generateGetTableQuery({ orderProperty, orderDirection });

    const { token, cancel } = CancelToken.source();

    cancelable(() => cancel(`Request to ${GET_TABLE_QUERY} is outdated`));

    const { data: { data: { table } } } = await cache(GET_TABLE_QUERY, async () => (
      await axios({ params: { query: GET_TABLE_QUERY } }, { cancelToken: token })
    ));

    return table;
  } catch (error) {
    console.log(error);

    throw error;
  }
});

export const setOrderProperty = createAction('TABLE_ORDER_SET_PROPERTY_NAME');

export const normalOrderDirection = 'ASC';
export const reverseOrderDirection = 'DESC';

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

const data = createReducer({
  isFething: false,
  table: [],
  orderProperty: 'name',
  orderDirection: normalOrderDirection,
  error: null,
}, {
  [get.REQUEST_CONSTANT]: ({ silent }) => ({
    isFething: !silent,
  }),
  [get.RESPONSE_SUCCESS_CONSTANT]: ({ silent, data: table }) => ({
    isFething: silent,
    table,
  }),
  [get.RESPONSE_FAILURE_CONSTANT]: ({ silent, error }) => ({
    isFething: silent,
    error,
  }),
  [setOrderProperty.CONSTANT]: orderProperty => ({
    orderProperty,
  }),
  [setNormalOrderDirection.CONSTANT]: () => ({
    direction: normalOrderDirection,
  }),
  [setReverseOrderDirection.CONSTANT]: () => ({
    direction: reverseOrderDirection,
  }),
});

export const setName = createAction('TABLE_CREATE_SET_INPUT');

const create = createReducer({
  name,
}, {
  [setName.CONSTANT]: name => ({
    name,
  }),
});

export default combineReducers({
  data,
  create,
});
