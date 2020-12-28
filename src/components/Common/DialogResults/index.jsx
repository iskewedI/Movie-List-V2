import React from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
          <Tooltip title={t('tooltips.errors.no_list_created')} placement='top'>
            <ErrorOutlineIcon />
          </Tooltip>
        )}
        <DialogTitle
          id='responsive-dialog-title'
          className={classes.title}
          children={<h2 className={classes.titleText}>{title}</h2>}
          disableTypography={true}
        />

        <DialogContent className={classes.content}>
          <CardCollection cards={movies} />
        </DialogContent>
        <DialogActions className={classes.navButtons}>
          <Button onClick={onClose} color='primary'>
            {t('buttons.back')}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogResults;
