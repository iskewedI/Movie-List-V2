import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CircularProgress from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import Tooltip from '@material-ui/core/Tooltip';

import { getUserData, getUserLoaded } from '../../../store/user';

import {
  getListLength,
  getListName,
  createList,
  getRequestHasError,
  getListsLoading,
  getListHasChanges,
  getMyListSearched,
  searchMyList,
} from '../../../store/toSee';

import styles from './styles';

const ToSeeSummary = () => {
  const classes = styles();

  const dispatch = useDispatch();

  const [creatingList, setCreatingList] = useState(false);
  const [newListName, setNewListName] = useState('');

  const userData = useSelector(getUserData);
  const userLoaded = useSelector(getUserLoaded);

  const myListSearched = useSelector(getMyListSearched);

  useEffect(() => {
    if (userLoaded && userData.token && !myListSearched) {
      dispatch(searchMyList());
    }
  }, [dispatch, userLoaded, userData, myListSearched]);

  const listCount = useSelector(getListLength);
  const listName = useSelector(getListName);
  const hasChanges = useSelector(getListHasChanges);

  const loading = useSelector(getListsLoading);
  const error = useSelector(getRequestHasError);

  const getListCount = function () {
    const countElement = document.getElementById('toSeeCounter');

    if (countElement) {
      const current = parseInt(countElement.innerHTML);
      if (listCount > current) {
        const fontSize = parseFloat(
          getComputedStyle(countElement, null).getPropertyValue('font-size')
        );

        countElement.animate(
          [
            { fontSize: `${fontSize + 2.5}px`, color: 'green' },
            { fontSize: `${fontSize}px`, color: 'black' },
          ],
          250
        );
      }
    }
    return listCount;
  };

  const handleListNameChange = ({ currentTarget }) => {
    setNewListName(currentTarget.value);
  };
  const handleSubmitList = e => {
    e.preventDefault();

    dispatch(createList(newListName));
  };

  return (
    <div id='toSeeSummary' className={classes.summary}>
      {(listName && (
        <Link to='/listToSee' className='nav-link' href='/#'>
          To see:
          <span id='toSeeCounter' className={classes.counter}>
            {getListCount()}
          </span>
        </Link>
      )) ||
        (userData.token &&
          ((!creatingList && !loading && (
            <Button
              id='createList'
              style={{ color: 'green' }}
              onClick={() => setCreatingList(true)}
            >
              Create your list
            </Button>
          )) ||
            (!loading && (
              <form className={classes.newListForm} onSubmit={e => handleSubmitList(e)}>
                <TextField
                  id='newListForm'
                  className={classes.textField}
                  label='List name'
                  onChange={e => handleListNameChange(e)}
                />
                {error.hasError && (
                  <Tooltip placement='top' title={error.message}>
                    <ErrorOutlineIcon />
                  </Tooltip>
                )}
              </form>
            ))))}

      {listName && hasChanges && (
        <Tooltip placement='top' title='Unsaved changes'>
          <NewReleasesIcon style={{ marginLeft: '10px', color: '#56de56' }} />
        </Tooltip>
      )}
      {loading && <CircularProgress className={classes.circularProgress} size={20} />}
    </div>
  );
};

export default ToSeeSummary;
