import { makeStyles } from '@material-ui/styles';

const hidingCollection = {};

export default makeStyles({
  paper: {
    maxWidth: 900,
    width: '300vw',
    maxHeight: 650,
    height: '80vh',
    background: '#e0e0e0',
  },
  title: {
    textAlign: 'center',
  },
  titleText: {
    color: 'black',
  },
  navButtons: {
    float: 'right',
    display: 'block',
    alignSelf: 'center',
  },
  content: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedElement: {
    height: '100%',
    transition: 'transform 1s',
  },
  hidingLeft: {
    ...hidingCollection,
    transform: 'translateX(-120%)',
  },
  hidingRight: {
    ...hidingCollection,
    transform: 'translateX(120%)',
  },
  showingLeft: {
    ...hidingCollection,
    position: 'absolute',
    left: '-80%',
    transform: 'translateX(120%)',
  },
  showingRight: {
    ...hidingCollection,
    position: 'absolute',
    right: '-80%',
    transform: 'translateX(-130%)',
  },
});
