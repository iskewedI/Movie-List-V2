import React from "react";
import { useSelector } from "react-redux";
import { CircularProgress, Grid } from "@material-ui/core";
import { getSearchedMovies, getMoviesLoading } from "../../../store/movies";
import MovieCard from "../MovieCard/";
import styles from "./styles";

const CardCollection = ({ rangeToShow }) => {
  const classes = styles();
  const movies = useSelector(getSearchedMovies);

  const loading = useSelector(getMoviesLoading);
  if (loading || !movies) return <CircularProgress size={80} />;

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
