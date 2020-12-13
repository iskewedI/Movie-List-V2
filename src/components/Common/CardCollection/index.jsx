import React from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import {
  getSearchedMovies,
  getMoviesLoading,
  getMoviesHasError,
} from '../../../store/movies';
import MovieCard from '../MovieCard/';
import styles from './styles';

const CardCollection = ({ rangeToShow }) => {
  const classes = styles();
  const movies = useSelector(getSearchedMovies);

  const hasError = useSelector(getMoviesHasError);
  const loading = useSelector(getMoviesLoading);

  if (loading || !movies) return <CircularProgress size={80} />;

  if (hasError)
    return (
      <React.Fragment>
        <ErrorOutlineIcon className={classes.errorIcon} />
        <h3 className={classes.errorMessage}>
          Oops! It seems that your search was too short or incorrect :(
        </h3>
      </React.Fragment>
    );
  const moviesToRender = movies.slice(rangeToShow.start, rangeToShow.end);
  return (
    <Grid className={classes.grid}>
      {moviesToRender.length === 0 && <div>No movies found!</div>}
      {moviesToRender.map((movie) => (
        <MovieCard key={movie.imdbID} {...movie} />
      ))}
    </Grid>
  );
};

export default CardCollection;
