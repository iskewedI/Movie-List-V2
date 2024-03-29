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
  title: {
    marginBottom: '3vh',
    color: '#ffffff80',
  },
  textField: {
    width: '100%',
    '& .MuiFilledInput-root': {
      background: '#efefefe8',
      '&.Mui-focused fieldset': {
        border: 'none',
      },
    },
    '& .MuiInputBase-root': {
      borderRadius: '10px',
    },
    '& fieldset': {
      backgroundColor: '#efefefd6',
    },
    '& .MuiInputBase-input:focus': {
      backgroundColor: '#ffffff73',
    },
  },
  inputPlaceHolder: {
    fontSize: '2vw',
    borderRadius: 'inherit',
  },
  searchButton: {
    width: '15vw',
    height: '5vh',
    fontSize: '1rem',
    marginTop: '.8rem',
    background: '#efefeff7',
    color: '#dfdfdf',
  },
  movieIcon: {
    fontSize: '4rem',
  },
  label: {
    color: 'black',
    opacity: 0.7,
    fontSize: '1.2rem',
  },
});
