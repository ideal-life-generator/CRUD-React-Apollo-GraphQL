export default (CONSTANT, request, success, failure) => {
  const REQUEST_CONSTANT = `${CONSTANT}_REQUEST`;
  const RESPONSE_SUCCESS_CONSTANT = `${CONSTANT}_RESPONSE_SUCCESS`;
  const RESPONSE_FAILURE_CONSTANT = `${CONSTANT}_RESPONSE_FAILURE`;

  const asyncAction = (...args) => ({
    args,
    types: [
      REQUEST_CONSTANT,
      RESPONSE_SUCCESS_CONSTANT,
      RESPONSE_FAILURE_CONSTANT,
    ],
    request,
    success,
    failure,
  });

  asyncAction.REQUEST_CONSTANT = REQUEST_CONSTANT;
  asyncAction.RESPONSE_SUCCESS_CONSTANT = RESPONSE_SUCCESS_CONSTANT;
  asyncAction.RESPONSE_FAILURE_CONSTANT = RESPONSE_FAILURE_CONSTANT;

  return asyncAction;
};
