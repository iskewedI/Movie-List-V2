import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import PlaylistAddIcon from "@material-ui/icons/PlaylistAdd";
import BackspaceIcon from "@material-ui/icons/Backspace";
import {
  addMovieToList,
  removeMovieInList,
  getMovieInList,
} from "../../store/movies";
import styles from "./styles";
const MovieCard = (props) => {
  const classes = styles();
  const { Title, Year, Type, imdbID, Poster } = props;

  const dispatch = useDispatch();

  const switchInList = () => {
    if (!inList) {
      dispatch(addMovieToList(props));
    } else {
      dispatch(removeMovieInList(imdbID));
    }
  };
  const inList = useSelector(getMovieInList(imdbID));
  const image = Poster !== "N/A" ? Poster : undefined;
  return (
    <Card className={classes.cardRoot}>
      <CardActionArea className={classes.actionArea}>
        <CardContent className={classes.cardContent}>
          <CardMedia className={classes.image} image={Poster}></CardMedia>
          <div className={classes.cardText}>
            <Typography gutterBottom variant="h5" component="h2">
              {Title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h3">
              {Year}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="h3">
              {Type}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Ver más
        </Button>
        <Button size="small" color="primary" onClick={switchInList}>
          {!inList ? <PlaylistAddIcon /> : <BackspaceIcon />}
        </Button>
      </CardActions>
    </Card>
  );
};

MovieCard.propTypes = {
  Title: PropTypes.string.isRequired,
  Year: PropTypes.string.isRequired,
  Type: PropTypes.string.isRequired,
  imdbID: PropTypes.string.isRequired,
  Poster: PropTypes.string.isRequired,
};

export default MovieCard;
