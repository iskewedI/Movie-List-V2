import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { availableLanguages } from './../../../i18nextConf';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';
import { searchMovies, setSearchTitle } from '../../../store/movies';
import { getUser, getUserData } from '../../../store/user';
import SearchCard from '../../Project/SearchCard/';
import DialogResults from './components/DialogResults/';
import styles from './styles';
import { LanguageSelector } from '../../Common/LanguageSelector';

const Home = () => {
  const { t, i18n } = useTranslation();

  const classes = styles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const dispatch = useDispatch();

  const userData = useSelector(getUserData);

  useEffect(() => {
    if (userData.token) {
      dispatch(getUser());
    }
  }, [userData, dispatch]);

  const handleSearch = movieTitle => {
    dispatch(setSearchTitle(movieTitle));
    dispatch(searchMovies());

    setDialogOpen(true);
  };

  const onChangeLanguage = lang => {
    i18n.changeLanguage(lang);
  };

  const languages = availableLanguages.map(lang => ({
    label: lang,
    value: t(`languages.${lang}`),
  }));

  return (
    <React.Fragment>
      <LanguageSelector
        label={t('home.language_selector.label')}
        selectedLanguage={i18n.language}
        languages={languages}
        handleChange={onChangeLanguage}
      />
      <Container className={classes.container}>
        <SearchCard onSearch={handleSearch} />
        {dialogOpen && (
          <DialogResults
            title={t('home.dialog.title')}
            onClose={() => setDialogOpen(false)}
          />
        )}
      </Container>
    </React.Fragment>
  );
};

export default Home;
