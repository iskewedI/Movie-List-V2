import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  getMyList,
  getListName,
  saveList,
  getListHasChanges,
  getMoviesSearched,
  getSearchingMovies,
  searchMoviesInList,
  getSearchingMyList,
} from './../../../store/toSee';
import { getUserLoaded, getUserLoading, getUser } from '../../../store/user';

import Button from '@material-ui/core/Button';

import HorizontalAccordion from '../../Common/HorizontalAccordion/';

import styles from './styles';

const ListToSee = () => {
  const { t } = useTranslation();

  const classes = styles();

  const dispatch = useDispatch();

  const userLoaded = useSelector(getUserLoaded);
  const userLoading = useSelector(getUserLoading);

  const moviesSearched = useSelector(getMoviesSearched);
  const searchingMovies = useSelector(getSearchingMovies);

  const searchingMyList = useSelector(getSearchingMyList);

  const listName = useSelector(getListName);

  const listToSee = useSelector(getMyList);

  useEffect(() => {
    //REFACTOR
    if (!userLoaded && !userLoading) {
      dispatch(getUser());
    }

    if (!searchingMyList && !moviesSearched && !searchingMovies) {
      dispatch(searchMoviesInList());
    }
  }, [
    dispatch,
    userLoaded,
    userLoading,
    searchingMyList,
    moviesSearched,
    searchingMovies,
  ]);

  const hasChanges = useSelector(getListHasChanges);

  const onSaveChanges = () => {
    dispatch(saveList());
  };

  // const types = [t('lists.types.movies'), t('lists.types.series')];
  const types = ['movies', 'series'];

  return (
    <React.Fragment>
      <div className={classes.listInfo}>
        <h2 className={classes.listName}>{listName}</h2>
        {hasChanges && (
          <Button
            id='saveChanges'
            variant='contained'
            color='primary'
            onClick={onSaveChanges}
            className={classes.saveButton}
          >
            {t('buttons.save')}
          </Button>
        )}
      </div>

      <div className={classes.accordionsContainer}>
        {types.map((type, i) => (
          <div key={`Accordion ${i}`} className={classes.accordionRow}>
            <h1 className={classes.titles}>{t(`lists.types.${type}`)}</h1>
            <HorizontalAccordion
              elements={listToSee.filter(e =>
                type.toUpperCase().includes(e.Type.toUpperCase())
              )}
              noContentMessage={t('lists.messages.no_content').replace(
                '{type}',
                t(`lists.types.${type}`)
              )}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ListToSee;
