export default (type) => {
  const action = (...payload) => ({ type, payload });

  action.type = type;

  return action;
};
