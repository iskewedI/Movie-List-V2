import { makeStyles } from '@material-ui/core';

export default makeStyles({
  chatBot: {
    position: 'absolute',
    right: '25px',
    bottom: '25px',
    width: '23vw',
  },
  compressedChat: {
    width: '23vw',
    background: '#656565b3',
    border: 'solid 2px #6f6f6f',
    '&:hover': {
      backgroundColor: '#7d7d7dfa',
    },
  },
});
