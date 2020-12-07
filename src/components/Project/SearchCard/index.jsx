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
      <Card className={classes.cardContainer}>
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
            placeholder='Serie or movie title here...'
            onChange={handleTextChange}
            InputProps={{ classes: { input: classes.inputPlaceHolder } }}
          />
        </form>
        <Button
          className={classes.searchButton}
          variant='outlined'
          color='primary'
          onClick={() => onSearch(searchText)}
        >
          Search
        </Button>
      </Card>
    </Container>
  );
};

export default SearchCard;
