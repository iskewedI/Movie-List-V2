import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { searchMovies, setSearchTitle } from '../../../store/movies';
import { getUser, getUserData } from '../../../store/user';
import SearchCard from '../../Project/SearchCard/';
import DialogResults from '../../Common/DialogResults/';
import styles from './styles';
const Home = () => {
  const classes = styles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const userData = useSelector(getUserData);

  useEffect(() => {
    if (userData.token) {
      dispatch(getUser());
    }
  }, [userData, dispatch]);

  const handleSearch = movieTitle => {
    dispatch(setSearchTitle(movieTitle));
    dispatch(searchMovies());
    setDialogOpen(true);
  };

  return (
    <React.Fragment>
      <Container className={classes.container}>
        <SearchCard onSearch={handleSearch} />
        {dialogOpen && (
          <DialogResults
            title={'Select the movie'}
            onClose={() => setDialogOpen(false)}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default Home;
