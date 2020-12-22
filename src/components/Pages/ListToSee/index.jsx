import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const types = ['Movies', 'Series'];

  return (
    <React.Fragment>
      <div className={classes.listInfo}>
        <h2 className={classes.listName}>{listName}</h2>
        {hasChanges && (
          <Button
            variant='contained'
            color='primary'
            onClick={onSaveChanges}
            className={classes.saveButton}
          >
            Save
          </Button>
        )}
      </div>

      <div className={classes.accordionsContainer}>
        {types.map((t, i) => (
          <div key={`Accordion ${i}`} className={classes.accordionRow}>
            <h1 className={classes.titles}>{t}</h1>
            <HorizontalAccordion
              elements={listToSee.filter(e =>
                t.toUpperCase().includes(e.Type.toUpperCase())
              )}
              type={t}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ListToSee;
