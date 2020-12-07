import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Container } from '@material-ui/core';
import { registerUser, getUserError, getUserData } from '../../../store/user';
import RegisterForm from '../../Forms/register';

const Register = () => {
  const dispatch = useDispatch();

  const handleSubmit = userData => {
    const { username, email, password } = userData;

    dispatch(registerUser({ username, email, password }));
  };

  const userErrors = useSelector(getUserError);
  const userData = useSelector(getUserData);

  if (userData.token) return <Redirect to='/' />;

  return (
    <Container>
      {userErrors.responseText && (
        <div className='alert alert-danger'>{userErrors.responseText}</div>
      )}

      <RegisterForm onSubmit={handleSubmit} />
    </Container>
  );
};

export default Register;