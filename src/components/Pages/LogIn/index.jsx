import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { setUserData, authUser, getUserError, getUserData } from '../../../store/user';
import LoginForm from '../../Forms/login';

const LogIn = () => {
  const dispatch = useDispatch();

  const handleSubmit = userData => {
    const { username, email, password } = userData;

    dispatch(setUserData(username, email));

    dispatch(authUser(password));
  };

  const userErrors = useSelector(getUserError);
  const userData = useSelector(getUserData);

  if (userData.token) return <Redirect to='/' />;

  return (
    <Container>
      {userErrors.responseText && (
        <div className='alert alert-danger'>{userErrors.responseText}</div>
      )}

      <LoginForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default LogIn;
