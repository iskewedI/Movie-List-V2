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
          label='Search'
          id='searchField'
          className={classes.textField}
          value={searchText}
          onChange={handleTextChange}
          variant='filled'
          InputProps={{ classes: { input: classes.inputPlaceHolder } }}
          InputLabelProps={{ className: classes.label }}
          FormHelperTextProps={{ style: { background: 'red' } }}
        />
      </form>
      <Button
        id='searchButton'
        className={classes.searchButton}
        style={{ backgroundColor: searchText === '' ? '#96c0e040' : '#96c0e05e' }}
        variant='contained'
        onClick={() => onSearch(formatText(searchText))}
      >
        {t('home.search_button')}
      </Button>
    </Container>
  );
};

export default SearchCard;
