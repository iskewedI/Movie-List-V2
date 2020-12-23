import React from 'react';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import Tooltip from '@material-ui/core/Tooltip';
import CardCollection from '../CardCollection/';
import { getSearchedMovies } from '../../../store/movies';
import { getListName } from '../../../store/toSee';
import styles from './styles';

const DialogResults = ({ title, onClose }) => {
  const classes = styles();

  const movies = useSelector(getSearchedMovies);

  const listName = useSelector(getListName);

  return (
    <React.Fragment>
      <Dialog
        open={true}
        onClose={onClose}
        aria-labelledby='responsive-dialog-title'
        PaperProps={{ className: classes.paper }}
      >
        {!listName && (
          <Tooltip
            title='You need to create a list to keep selected movies in touch!'
            placement='top'
          >
            <ErrorOutlineIcon />
          </Tooltip>
        )}
        <DialogTitle id='responsive-dialog-title' className={classes.title}>
          {title}
        </DialogTitle>
        <DialogContent className={classes.content}>
          <CardCollection cards={movies} />
        </DialogContent>
        <DialogActions className={classes.navButtons}>
          <Button onClick={onClose} color='primary'>
            Back
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogResults;
