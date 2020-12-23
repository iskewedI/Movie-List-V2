import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  grid: {
    display: 'inline-flex',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
    gridColumnGap: '1.5vw',
  },
  errorIcon: {
    position: 'absolute',
    top: '25%',
    fontSize: 'xxx-large',
    color: '#e02525',
  },
  errorMessage: {
    color: 'black !important',
  },
});
