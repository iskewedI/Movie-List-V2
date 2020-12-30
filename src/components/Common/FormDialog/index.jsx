import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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
      <Button id='createList' onClick={handleClickOpen}>
        {buttonOpen}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
        <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{intro}</DialogContentText>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label={placeholder}
            type='email'
            onChange={handleTextChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            {buttonCancel}
          </Button>
          <Button onClick={() => onSubmit(text)} color='primary'>
            {buttonOk}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
