export default (CONSTANT) => {
  const action = (...args) => ({
    type: CONSTANT,
    args,
  });

  action.CONSTANT = CONSTANT;

  return action;
};
