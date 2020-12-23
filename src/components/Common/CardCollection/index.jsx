import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { CircularProgress, Grid } from '@material-ui/core';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Button from '@material-ui/core/Button';
import MovieCard from '../MovieCard/';
import { getMoviesLoading, getMoviesHasError } from '../../../store/movies';

import styles from './styles';

const CardCollection = ({ cards }) => {
  const classes = styles();

  const [rangeToShow, setRangeToShow] = useState({ start: 0, end: 3 });

  const hasError = useSelector(getMoviesHasError);
  const loading = useSelector(getMoviesLoading);

  const canMoveNext = rangeToShow.end < cards.length;
  const canMoveBack = rangeToShow.start > 0;

  const hangleRangeChanged = direction => {
    if (direction === 'next') {
      if (canMoveNext) {
        setRangeToShow({
          start: rangeToShow.start + 3,
          end: rangeToShow.end + 3,
        });
      }
    } else {
      if (canMoveBack) {
        setRangeToShow({
          start: rangeToShow.start - 3,
          end: rangeToShow.end - 3,
        });
      }
    }
  };

  if (loading || !cards) return <CircularProgress size={80} />;

  if (hasError)
    return (
      <React.Fragment>
        <ErrorOutlineIcon className={classes.errorIcon} />
        <h3 className={classes.errorMessage}>
          Oops! It seems that your search was too short or incorrect :(
        </h3>
      </React.Fragment>
    );

  const cardsToRender = cards.slice(rangeToShow.start, rangeToShow.end);

  if (cardsToRender.length === 0) return <div>No movies found!</div>;

  return (
    <React.Fragment>
      <Button className={classes.arrowLeft} onClick={() => hangleRangeChanged('back')}>
        {<ArrowBackIcon color={canMoveBack ? 'primary' : 'disabled'} />}
      </Button>
      <Grid className={classes.grid}>
        {cardsToRender.map(movie => (
          <MovieCard key={movie.imdbID} {...movie} />
        ))}
      </Grid>
      <Button className={classes.arrowRight} onClick={() => hangleRangeChanged('next')}>
        {<ArrowForwardIcon color={canMoveNext ? 'primary' : 'disabled'} />}
      </Button>
    </React.Fragment>
  );
};

export default CardCollection;
