import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { addToList, removeFromList, getMovieInList } from '../../../store/toSee';
import styles from './styles';

const MovieCard = props => {
  const classes = styles();
  const { Title, Year, Type, imdbID, Poster } = props;

  const dispatch = useDispatch();

  const switchInList = () => {
    if (!inList) {
      dispatch(addToList(props));
    } else {
      dispatch(removeFromList(imdbID));
    }
  };
  const inList = useSelector(getMovieInList(imdbID));
  const image = Poster !== 'N/A' ? Poster : undefined;
  return (
    <Card className={classes.cardRoot}>
      <CardActionArea className={classes.actionArea}>
        <CardContent className={classes.cardContent}>
          <CardMedia className={classes.image} image={image}></CardMedia>
          <div className={classes.cardText} id='cardText'>
            <Typography gutterBottom variant='h5' component='h2' color='primary'>
              {Title}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='h3'>
              {Year}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='h3'>
              {Type}
            </Typography>
          </div>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size='small' color='primary'>
          More info
        </Button>
        <Button size='small' color='primary' onClick={switchInList}>
          {!inList ? (
            <Tooltip title='Add' placement='top'>
              <PlaylistAddIcon />
            </Tooltip>
          ) : (
            <Tooltip title='Remove' placement='top'>
              <BackspaceIcon />
            </Tooltip>
          )}
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
