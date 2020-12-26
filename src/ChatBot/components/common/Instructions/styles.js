import { makeStyles } from '@material-ui/core';

export default makeStyles({
  instructionsContainter: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  instruction: {
    textAlign: 'center',
    padding: '0.5rem',
    borderRadius: '25px',
    background: 'transparent',
    border: '1px solid #c3c0f5',
    margin: '3px',
    color: 'black',
  },
  orientation: {
    display: 'block',
    color: 'red',
    margin: '0 auto',
  },
  stepController: {
    margin: '0 auto',
    color: '#3974e0',
  },
});
