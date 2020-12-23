import { makeStyles } from '@material-ui/core';

const centeredStyledObj = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};
export default makeStyles({
  container: {
    height: '40vh',
    width: '70vw',
    flexDirection: 'column',
    ...centeredStyledObj,
  },
  cardContainer: {
    backgroundColor: '#dcdcdc4a',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    padding: '2rem',
    ...centeredStyledObj,
  },
  title: {
    fontSize: '5.5vw',
  },
  textField: {
    width: '90%',
  },
  inputPlaceHolder: {
    fontSize: '1.8vw',
  },
  searchButton: {
    width: '15vw',
    height: '5vh',
    fontSize: '1.2vw',
    marginTop: '.8rem',
  },
  movieIcon: {
    fontSize: '4rem',
  },
});
