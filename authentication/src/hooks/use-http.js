import { useCallback, useReducer } from "react";

const httpReducer = (state, action) => {
  if (action.type === "SEND") {
    return {
      status: "pending",
      error: null,
      data: null,
    };
  }

  if (action.type === "SUCCESS") {
    return {
      status: "completed",
      error: null,
      data: action.data,
    };
  }

  if (action.type === "ERROR") {
    return {
      status: "completed",
      error: action.data.error,
      data: null,
    };
  }

  return state;
};

const useHttp = (requestFunction, startWithPending = true) => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? true : false,
    error: null,
    data: null,
  });

  const sendRequest = useCallback(
    async (requestData) => {
      dispatch({ type: "SEND" });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: "SUCCESS", responseData });
      } catch (error) {
        dispatch({ type: "ERROR", errorMessage: error.message });
      }
    },
    [requestFunction]
  );
  return { sendRequest, ...httpState };
};

export default useHttp;
