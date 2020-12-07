import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from '@material-ui/core';
import { searchMovies, setSearchTitle } from '../../../store/movies';
import { getUser } from '../../../store/user';
import SearchCard from '../../Project/SearchCard/';
import DialogResults from '../../Common/DialogResults/';
import styles from './styles';
const Home = () => {
  const classes = styles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  });

  const handleSearch = movieTitle => {
    dispatch(setSearchTitle(movieTitle));
    dispatch(searchMovies());
    setDialogOpen(true);
  };
  return (
    <Container className={classes.container}>
      <SearchCard onSearch={handleSearch} />
      {dialogOpen && (
        <DialogResults title={'Select the movie'} onClose={() => setDialogOpen(false)} />
      )}
    </Container>
  );
};

export default Home;
