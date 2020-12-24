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
    fontSize: '5.5vw',
    marginBottom: "3vh",
    color: "#ffffff80"
  },
  textField: {
    width: '100%',
    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: "none"
      },
    },
    "& .MuiInputBase-root": {
      borderRadius: "10px"
    },
    "& fieldset": {
      backgroundColor: "#efefefd6"
    }
  },
  inputPlaceHolder: {
    fontSize: '1.8vw',
    // border: "none",
    color: "black"
  },
  searchButton: {
    width: '15vw',
    height: '5vh',
    fontSize: '1.2vw',
    marginTop: '.8rem',
    background: "#efefeff7"
  },
  movieIcon: {
    fontSize: '4rem',
  },
});
