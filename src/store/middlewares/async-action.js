function resolveRequest(args, request, dispatch, getState) {
  const { cancels } = request;
  const isHaveCancelsContainer = Array.isArray(cancels);

  const cache = new Map();

  const props = {
    cancelable(cancel) {
      if (isHaveCancelsContainer) {
        cancels.push(cancel);
      } else {
        Object.assign(request, { cancels: [cancel] });
      }
    },
    async cache(key, req) {
      const cached = cache.get(key);

      if (cached) {
        return cached;
      }

      const data = await req();

      cache.set(key, data);

      return data;
    },
  };

  if (isHaveCancelsContainer && cancels.length > 0) {
    cancels.forEach(cancel => cancel());

    cancels.length = 0;
  }

  const promise = request(...args, props, getState, dispatch);

  Object.assign(request, { promise });

  return new Promise(async (resolve, reject) => {
    try {
      const response = await promise;

      if (request.promise === promise) {
        if (typeof response === 'function') {
          const responseResult = response();

          resolve(responseResult);
        } else {
          resolve(response);
        }
      }
    } catch (error) {
      if (request.promise === promise) {
        reject(error);
      }
    }
  });
}

export default store => next => async (action) => {
  if (action.types && action.request) {
    const { args, types, request, success, failure } = action;

    const { dispatch, getState } = store;

    const [
      REQUEST_CONSTANT,
      RESPONSE_SUCCESS_CONSTANT,
      RESPONSE_FAILURE_CONSTANT,
    ] = types;

    try {
      dispatch({ type: REQUEST_CONSTANT, args });

      const data = await resolveRequest(args, request, dispatch, getState);

      dispatch({ type: RESPONSE_SUCCESS_CONSTANT, args, data });

      if (success) {
        success(dispatch, getState, data, ...args);
      }

      return data;
    } catch (error) {
      dispatch({ type: RESPONSE_FAILURE_CONSTANT, args, error });

      if (failure) {
        failure(dispatch, getState, error, ...args);
      }

      return error;
    }
  } else {
    next(action);
  }
};
