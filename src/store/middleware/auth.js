import * as actions from '../actions/api';

const auth = ({ dispatch }) => (next) => async (action) => {
  if (action.type !== actions.apiCallBegan.type) return next(action);

  const { headers = {}, customData, onError } = action.payload;

  if (customData && customData.byPassAuth) return next(action);

  const token = localStorage.getItem('authToken');
  if (!token) {
    if (onError)
      dispatch({
        type: onError,
        payload: { message: 'User not registered.' },
        customData,
      });
    return dispatch(actions.apiCallFailed('User not registered.'));
  }

  headers['x-auth-token'] = token;

  if (!action.payload.headers) {
    action.payload.headers = headers;
  }

  next(action);
};

export default auth;
