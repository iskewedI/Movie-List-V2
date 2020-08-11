import axios from "axios";
import * as actions from "../actions/api";
import configs from "../../configs.json";

const { baseURL, apiKey } = configs;

const api = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    url,
    params,
    method,
    data,
    customData,
    onStart,
    onSuccess,
    onError,
  } = action.payload;

  if (onStart) {
    dispatch({ type: onStart });
  }
  next(action);

  try {
    const response = await axios.request({
      url,
      baseURL: baseURL + apiKey,
      params,
      method,
      data,
    });
    if (!response.data.Error) {
      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess)
        dispatch({ type: onSuccess, payload: response.data, customData });
    } else {
      dispatch(actions.apiCallFailed(response.Data.Error));
      if (onError) dispatch({ type: onError, payload: response.Data.Error });
    }
  } catch (error) {
    dispatch(actions.apiCallFailed(error.message));
    if (onError) dispatch({ type: onError, payload: error.message });
  }
};

export default api;
