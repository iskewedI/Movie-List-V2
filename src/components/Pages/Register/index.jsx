import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Container } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {
  registerUser,
  getUserError,
  getUserData,
  getUserLoading,
} from '../../../store/user';
import RegisterForm from '../../Forms/register';

const Register = () => {
  const { i18n } = useTranslation();

  const dispatch = useDispatch();

  const handleSubmit = userData => {
    const { username, email, password } = userData;

    dispatch(registerUser({ username, email, password, lang: i18n.language }));
  };

  const userLoading = useSelector(getUserLoading);
  const userErrors = useSelector(getUserError);
  const userData = useSelector(getUserData);

  if (userData.token) return <Redirect to='/' />;

  return (
    <Container>
      {userErrors.responseText && (
        <div className='alert alert-danger'>{userErrors.responseText}</div>
      )}

      <RegisterForm onSubmit={handleSubmit} />
      {userLoading && <CircularProgress className='circularProgress' />}
    </Container>
  );
};

export default Register;
