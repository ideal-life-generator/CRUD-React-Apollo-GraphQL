export default (initialState, handlers) => (state = initialState, { type, payload }) => {
  const { [type]: handler } = handlers;

  if (handler) {
    return {
      ...state,
      ...handler(state, ...payload),
    };
  }

  return state;
};
