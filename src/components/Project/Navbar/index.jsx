import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import CircularProgress from '@material-ui/core/CircularProgress';
import Tooltip from '@material-ui/core/Tooltip';

import { getListsLoading } from '../../../store/toSee';
import { getUserData } from '../../../store/user';

import ToSeeSummary from '../ToSeeSummary';

import styles from './styles';

const Navbar = () => {
  const classes = styles();

  const userData = useSelector(getUserData);

  const loading = useSelector(getListsLoading);

  return (
    <div>
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
            <ToSeeSummary />
          </div>

          <div className='nav navbar-nav ml-auto'>
            {!userData.token && (
              <div className='navbar-nav'>
                <Link
                  id='LogInButton'
                  to='/login'
                  className='nav-link navbar-right btn btn-outline-light instructionFocusable'
                  href='/#'
                >
                  Log-In
                </Link>
                <Tooltip title='Register for free!'>
                  <Link
                    id='SignUpButton'
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
                  id='meButton'
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
