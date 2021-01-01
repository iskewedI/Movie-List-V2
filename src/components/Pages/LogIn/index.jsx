import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  setUserData,
  authUser,
  getUserError,
  getUserData,
  getUserLoading,
} from '../../../store/user';
import LoginForm from '../../Forms/login';

const LogIn = () => {
  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  const handleSubmit = userData => {
    const { username, email, password } = userData;

    dispatch(setUserData(username, email));

    dispatch(authUser(password, i18n.language));
  };

  const userErrors = useSelector(getUserError);
  const userData = useSelector(getUserData);
  const userLoading = useSelector(getUserLoading);

  if (userData.token) return <Redirect to='/' />;

  return (
    <Container>
      {userErrors.responseText && (
        <div className='alert alert-danger'>{userErrors.responseText}</div>
      )}

      <LoginForm onSubmit={handleSubmit} />
      {userLoading && <CircularProgress className='circularProgress' />}
    </Container>
  );
};

export default LogIn;
