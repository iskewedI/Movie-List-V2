import { makeStyles } from '@material-ui/core';

export default makeStyles({
  accordionsContainer: {
    backgroundColor: '#222',
    display: 'grid',
    gridTemplateRows: 'repeat(2, 1fr)',
  },
  titles: {
    color: 'white',
    margin: 10,
    userSelect: 'none',
    textAlign: 'center',
  },
  listInfo: {
    display: 'inline-flex',
    placeContent: 'center',
    width: '100%',
  },
  listName: {
    textAlign: 'center',
    margin: '5px',
  },
  saveButton: {
    marginLeft: '5px',
    height: '50%',
  },
});
