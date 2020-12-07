import { createSlice } from '@reduxjs/toolkit';
import { apiCallBegan } from './actions/api';
import { createSelector } from 'reselect';
import { backend } from '../configs.json';

const errorDefaultSchema = {
  message: null,
  status: null,
  statusText: null,
  responseText: null,
};

const slice = createSlice({
  name: 'user',
  initialState: {
    userData: {
      token: localStorage.getItem('authToken'),
      userName: null,
      email: null,
    },

    loading: false,
    hasError: false,
    error: errorDefaultSchema,
  },
  reducers: {
    newUserRequested: (user, action) => {
      user.loading = true;

      user.error = errorDefaultSchema;
    },
    newUserReceived: (user, action) => {
      const { userData } = user;
      const { username, email } = action.payload;
      const { token } = action.customData;

      localStorage.setItem('authToken', token);

      userData.token = token;
      userData.userName = username;
      userData.email = email;

      user.loading = false;
      user.hasError = false;
    },
    newUserRequestFailed: (user, action) => {
      user.loading = false;
      user.hasError = true;

      const { message, status, statusText, responseText } = action.payload;

      user.error = { message, status, statusText, responseText };
    },
    userRequested: (user, action) => {
      user.loading = true;

      user.error = errorDefaultSchema;
    },
    userReceived: (user, action) => {
      const { userData } = user;
      const { username, email } = action.payload;

      userData.userName = username;
      userData.email = email;
    },
    userRequestFailed: (user, action) => {
      user.loading = false;
      user.hasError = true;

      const { message, status, statusText, responseText } = action.payload;

      user.error = { message, status, statusText, responseText };
    },
    authRequested: (user, action) => {
      user.loading = true;

      user.error = errorDefaultSchema; //Reset error object.
    },
    authReceived: (user, action) => {
      const { userData } = user;
      const { token } = action.payload;

      localStorage.setItem('authToken', token);

      userData.token = token;

      user.loading = false;
      user.hasError = false;
    },
    authRequestFailed: (user, action) => {
      user.loading = false;
      user.hasError = true;

      const { message, status, statusText, responseText } = action.payload;

      user.error = { message, status, statusText, responseText };
    },
    userLoggedOut: (user, action) => {
      const { userData } = user;

      userData.token = null;

      localStorage.removeItem('authToken');
    },
    userDataSetted: (user, action) => {
      const { username, email } = action.payload;
      const { userData } = user;

      userData.userName = username;
      userData.email = email;
    },
  },
});

const {
  newUserRequested,
  newUserReceived,
  newUserRequestFailed,
  authRequested,
  authReceived,
  authRequestFailed,
  userRequested,
  userReceived,
  userRequestFailed,
  userDataSetted,
  userLoggedOut,
} = slice.actions;

export default slice.reducer;

//Action creators
const { baseURL } = backend;

export const registerUser = ({ username, email, password }) => (dispatch, getState) => {
  const url = 'users';

  const data = { username, email, password };
  return dispatch(
    apiCallBegan({
      method: 'POST',
      baseURL,
      url,
      data,
      customData: { byPassAuth: true },
      onStart: newUserRequested.type,
      onSuccess: newUserReceived.type,
      onError: newUserRequestFailed.type,
    })
  );
};

export const authUser = password => (dispatch, getState) => {
  const { token, email } = getState().entities.user.userData;

  if (token) return;

  const url = 'auth';

  const data = { email, password };
  return dispatch(
    apiCallBegan({
      method: 'POST',
      baseURL,
      url,
      data,
      customData: { byPassAuth: true },
      onStart: authRequested.type,
      onSuccess: authReceived.type,
      onError: authRequestFailed.type,
    })
  );
};

export const getUser = () => (dispatch, getState) => {
  const { token, userName, email } = getState().entities.user.userData;

  if (userName && email) return;

  if (!token) return;

  const url = 'users/me';

  return dispatch(
    apiCallBegan({
      baseURL,
      url,
      onStart: userRequested.type,
      onSuccess: userReceived.type,
      onError: userRequestFailed.type,
    })
  );
};

export const setUserData = (username, email) => dispatch =>
  dispatch(userDataSetted({ username, email }));

export const logOutUser = () => dispatch => dispatch(userLoggedOut());

export const getUserData = createSelector(
  state => state.entities.user,
  user => user.userData
);

export const getUserError = createSelector(
  state => state.entities.user,
  user => user.error
);
