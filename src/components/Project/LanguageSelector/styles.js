import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    backgroundColor: 'white',
    borderRadius: '6px',
    '& .MuiInputLabel-animated, .MuiInput-input': {
      marginLeft: '5px',
    },
  },
}));
