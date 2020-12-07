import axios from 'axios';
import * as actions from '../actions/api';

const api = ({ dispatch }) => next => async action => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const {
    baseURL,
    apiKey,
    url,
    params,
    headers = {},
    method,
    data,
    customData = {},
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
      baseURL: `${baseURL}${apiKey || ''}`,
      params,
      method,
      data,
      headers,
    });
    if (!response.data.Error) {
      customData.token = response.headers['x-auth-token'];
      dispatch(actions.apiCallSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data, customData });
    } else {
      dispatch(actions.apiCallFailed(response.Data.Error));
      if (onError) dispatch({ type: onError, payload: response.Data.Error });
    }
  } catch (error) {
    const data = {
      message: error.message,
    };
    if (error.response) {
      data.responseText = error.response.data;
      data.status = error.response.status;
      data.statusText = error.response.statusText;
    }
    dispatch(actions.apiCallFailed(data));
    if (onError) dispatch({ type: onError, payload: data });
  }
};

export default api;
