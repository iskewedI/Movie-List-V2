import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Container, Typography, TextField, Button } from '@material-ui/core';
import styles from './styles';

const SearchCard = ({ onSearch }) => {
  const { t } = useTranslation();

  const classes = styles();

  const [searchText, setSearchText] = useState('');

  const handleTextChange = event => {
    setSearchText(event.target.value);
  };

  const formatText = text => text.split(' ').join('-');

  return (
    <Container className={classes.container}>
      <Typography variant='h2' className={classes.title}>
        {t('home.search_title')}
      </Typography>
      <form
        onSubmit={e => {
          e.preventDefault();
          onSearch(formatText(searchText));
        }}
        className={classes.textField}
      >
        <TextField
          id='searchField'
          className={classes.textField}
          value={searchText}
          onChange={handleTextChange}
          variant='filled'
          InputProps={{ classes: { input: classes.inputPlaceHolder } }}
          FormHelperTextProps={{ style: { background: 'red' } }}
        />
      </form>
      <Button
        id='searchButton'
        className={classes.searchButton}
        style={{ backgroundColor: searchText === '' ? '#96c0e040' : '#ffffff80' }}
        variant='contained'
        onClick={() => onSearch(formatText(searchText))}
      >
        {t('home.search_button')}
      </Button>
    </Container>
  );
};

export default SearchCard;
