import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import { logOutUser } from '../../../store/user';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logOutUser());
    window.location.reload();
  });

  return (
    <div>
      Logging out...
      {<Redirect to='/' />}
      <CircularProgress />
    </div>
  );
};

export default Home;
