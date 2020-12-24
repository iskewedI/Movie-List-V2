import React, { useState } from 'react';
import { Container, Typography, Card, TextField, Button } from '@material-ui/core';
import styles from './styles';
const SearchCard = ({ onSearch }) => {
  const classes = styles();
  const [searchText, setSearchText] = useState('');

  const handleTextChange = event => {
    setSearchText(event.target.value);
  };

  return (
    <Container className={classes.container}>
        <Typography className={classes.title}>Movies&Series</Typography>
        <form
          onSubmit={e => {
            e.preventDefault();
            onSearch(searchText);
          }}
          className={classes.textField}
        >
          <TextField
            className={classes.textField}
            value={searchText}
            onChange={handleTextChange}
            variant="outlined"
            InputProps={{ classes: { input: classes.inputPlaceHolder } } }
            FormHelperTextProps={ { style: { background: "red"} }}
          />
        </form>
        <Button
          className={classes.searchButton}
          style={{ backgroundColor: searchText !== '' ? '#96c0e040' : null }}
          variant='outlined'
          onClick={() => onSearch(searchText)}
        >
          Search
        </Button>
    </Container>
  );
};

export default SearchCard;
