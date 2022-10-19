import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useStyles from './styles';

export default function FormDialog({
  onSubmit,
  buttonOpen,
  title,
  intro,
  placeholder,
  buttonCancel,
  buttonOk,
}) {
  const [open, setOpen] = React.useState(false);
  const [text, setText] = useState('');

  const classes = useStyles();

  const handleTextChange = ({ currentTarget }) => {
    setText(currentTarget.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        id='createList'
        onClick={handleClickOpen}
        className={`text-white ${classes.createListButton}`}
      >
        {buttonOpen}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        classes={{ paper: classes.formPaper, root: classes.dialogRoot }}
      >
        <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            {intro}
          </DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label={placeholder}
            className='white-placeholder'
            InputLabelProps={{ style: { color: '#ffffff57' } }}
            type='email'
            onChange={handleTextChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={classes.dialogPrimaryButton}>
            {buttonCancel}
          </Button>
          <Button
            onClick={() => onSubmit(text)}
            className={classes.dialogSecondaryButton}
          >
            {buttonOk}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
