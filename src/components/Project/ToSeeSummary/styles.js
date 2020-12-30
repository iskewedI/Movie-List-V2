import { makeStyles } from '@material-ui/core';

export default makeStyles({
  summary: {
    display: 'inline-flex',
  },
  counter: {
    position: 'absolute',
    marginLeft: '5px',
    fontSize: '16px',
  },
  newListForm: {
    position: 'absolute',
    // top: '60px',
    // left: '15px',
    height: '50%',
  },
  textField: {
    '& .MuiInput-formControl': {
      background: 'white',
      borderRadius: '10px',
    },
    '& .MuiInput-formControl:focus': {
      outline: 'none',
      textDecoration: 'none',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      color: '#ffffffe8',
      fontSize: '1.1rem',
    },
  },
  circularProgress: {
    margin: '0 10px',
  },
});
