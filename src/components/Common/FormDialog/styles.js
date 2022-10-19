import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  createListButton: {
    color: '#ffffffbf',
    display: 'inline-block',
    '& span': {
      verticalAlign: 'middle',
      lineHeight: 'normal',
    },
  },
  // Form root container
  formPaper: {
    backgroundColor: '#333',
  },
  dialogContentText: {
    color: '#dddddd',
  },
  dialogPrimaryButton: {
    color: '#c3c3c3',
  },
  dialogSecondaryButton: {
    color: '#9d9d9d',
  },
});
