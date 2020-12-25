import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import styles from './styles';

const SearchCard = ({ onSearch }) => {
  const classes = styles();
  const [searchText, setSearchText] = useState('');

  const handleTextChange = event => {
    setSearchText(event.target.value);
  };

  const formatText = text => text.split(' ').join('-');

  return (
    <Container className={classes.container}>
      <Typography variant='h2' className={classes.title}>
        Movies&Series
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSearch(formatText(searchText));
        }}
        className={classes.textField}
      >
        <TextField
          className={classes.textField}
          value={searchText}
          onChange={handleTextChange}
          variant='filled'
          InputProps={{ classes: { input: classes.inputPlaceHolder } }}
          FormHelperTextProps={{ style: { background: 'red' } }}
        />
      </form>
      <Button
        className={classes.searchButton}
        style={{ backgroundColor: searchText === '' ? '#96c0e040' : '#ffffff80' }}
        variant='contained'
        onClick={() => onSearch(formatText(searchText))}
      >
        Search
      </Button>
    </Container>
  );
};

export default SearchCard;
