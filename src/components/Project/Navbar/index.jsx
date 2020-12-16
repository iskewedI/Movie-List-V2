import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getListLength,
  getListName,
  createList,
  getRequestHasError,
  getListsLoading,
  getListHasChanges,
} from '../../../store/toSee';
import { getUserData } from '../../../store/user';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import CircularProgress from '@material-ui/core/CircularProgress';
import NewReleasesIcon from '@material-ui/icons/NewReleases';

import styles from './styles';

const Navbar = () => {
  const classes = styles();

  const dispatch = useDispatch();

  const [creatingList, setCreatingList] = useState(false);
  const [newListName, setNewListName] = useState('');

  const userData = useSelector(getUserData);

  const listName = useSelector(getListName);

  const listCount = useSelector(getListLength);

  const hasChanges = useSelector(getListHasChanges);

  const error = useSelector(getRequestHasError);

  const loading = useSelector(getListsLoading);

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
    <div className={classes.nav}>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to={'/'} className='navbar-brand' href='/#'>
          Movies
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarNavAltMarkup'
          aria-controls='navbarNavAltMarkup'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavAltMarkup'>
          <div className='navbar-nav'>
            <Link to={'/'} className='nav-link active' href='/#'>
              Home <span className='sr-only'>(current)</span>
            </Link>
            {(listName && (
              <Link to='/listToSee' className='nav-link' href='/#'>
                To see:
                <span id='toSeeCounter' className={classes.toSeeCounter}>
                  {getListCount()}
                </span>
              </Link>
            )) ||
              (userData.token &&
                ((!creatingList && (
                  <Button
                    style={{ color: 'green' }}
                    onClick={() => setCreatingList(true)}
                  >
                    Create your list
                  </Button>
                )) || (
                  <form
                    className={classes.newListForm}
                    onSubmit={e => handleSubmitList(e)}
                  >
                    <TextField
                      label='List name'
                      onChange={e => handleListNameChange(e)}
                    />
                    {error.hasError && (
                      <Tooltip placement='top' title={error.message}>
                        <ErrorOutlineIcon />
                      </Tooltip>
                    )}
                  </form>
                )))}
          </div>

          {listName && hasChanges && (
            <Tooltip placement='top' title='Unsaved changes'>
              <NewReleasesIcon style={{ marginLeft: '10px', color: '#56de56' }} />
            </Tooltip>
          )}

          <div className='nav navbar-nav ml-auto'>
            {!userData.token && (
              <div className='navbar-nav'>
                <Link
                  to='/login'
                  className='nav-link navbar-right btn btn-outline-light'
                  href='/#'
                >
                  Log-In
                </Link>
                <Tooltip title='Register for free!'>
                  <Link
                    to='/register'
                    className='nav-link navbar-right btn btn-outline-light text-primary'
                    href='/#'
                  >
                    Sign Up!
                  </Link>
                </Tooltip>
              </div>
            )}
            {loading && (
              <CircularProgress className={classes.circularProgress} size={40} />
            )}

            {userData.token && (
              <div className='navbar-nav'>
                <Link
                  to='/me'
                  className='nav-link navbar-right btn btn-outline-light text-primary'
                  href='/#'
                >
                  {userData.userName}
                </Link>
                <Link
                  to='/logout'
                  className='nav-link navbar-right btn btn-outline-light text-primary'
                  href='/#'
                >
                  Log Out
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
