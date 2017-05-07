import createAction from './utils/create-action';
import createReducer from './utils/create-reducer';

export const setUrl = createAction('SET_URL');

export default createReducer({}, {
  [setUrl.type]: (state, url) => ({ url }),
});
