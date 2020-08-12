import React from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import BackspaceIcon from "@material-ui/icons/Backspace";
import { removeMovieInList } from "../../../store/movies";
import styles from "./styles";

const HorizontalCard = (props) => {
  const classes = styles();
  const { Title, imdbID, Poster } = props;

  const dispatch = useDispatch();

  const deleteFromList = () => {
    dispatch(removeMovieInList(imdbID));
  };
  const image = Poster !== "N/A" ? Poster : undefined;
  return (
    <Card className={classes.cardRoot}>
      <CardActionArea className={classes.actionArea}>
        <CardContent className={classes.cardContent}>
          <CardMedia className={classes.image} image={image}></CardMedia>
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
        <Button size="small" color="primary" onClick={deleteFromList}>
          <BackspaceIcon />
        </Button>
      </CardActions>
    </Card>
  );
};

HorizontalCard.propTypes = {
  Title: PropTypes.string.isRequired,
  imdbID: PropTypes.string.isRequired,
  Poster: PropTypes.string.isRequired,
};

export default HorizontalCard;
