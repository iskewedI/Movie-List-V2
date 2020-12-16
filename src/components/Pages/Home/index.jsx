import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { searchMovies, setSearchTitle } from '../../../store/movies';
import {
  searchMyList,
  searchMoviesInList,
  getChanges,
  saveList,
} from '../../../store/toSee';
import { getUser, getUserData } from '../../../store/user';
import SearchCard from '../../Project/SearchCard/';
import DialogResults from '../../Common/DialogResults/';
import styles from './styles';
import ChangesViewer from '../../Common/ChangesViewer';
const Home = () => {
  const classes = styles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const userData = useSelector(getUserData);
  const changes = useSelector(getChanges);

  useEffect(() => {
    if (userData.token) {
      dispatch(getUser());

      dispatch(searchMyList());
      setTimeout(() => {
        dispatch(searchMoviesInList());
      }, 1000);
    }
  }, [userData, dispatch]);

  const handleSearch = movieTitle => {
    dispatch(setSearchTitle(movieTitle));
    dispatch(searchMovies());
    setDialogOpen(true);
  };

  const handleListChange = () => {
    dispatch(saveList());
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
        {userData.token && (
          <ChangesViewer changes={changes} onSaveChanges={handleListChange} />
        )}
      </Container>
    </React.Fragment>
  );
};

export default Home;
