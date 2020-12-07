import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logOutUser } from '../../../store/user';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOutUser());
  });

  return (
    <div>
      Logging out...
      {<Redirect to='/home' />}
    </div>
  );
};

export default Home;
