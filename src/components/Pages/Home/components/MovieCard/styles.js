import { makeStyles } from '@material-ui/styles';

export default makeStyles({
  cardRoot: {
    width: '25vw',
    maxWidth: 200,
    display: 'grid',
    gridTemplateRows: '90% 10%',
  },
  actionArea: {
    height: '100%',
  },
  cardContent: {
    height: '100%',
    padding: '0px !important',
  },
  image: {
    height: '100%',
    width: '100%',
    maxWidth: 200,
    display: 'block',
  },
  cardText: {
    textAlign: 'center',
  },
});
