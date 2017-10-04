export default (initialState, handlers) => (state = initialState, { type, args, ...payload }) => {
  const { [type]: handler } = handlers;

  if (handler) {
    return {
      ...state,
      ...handler(payload, ...args, state),
    };
  }

  return state;
};
