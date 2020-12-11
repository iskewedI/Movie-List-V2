import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllMoviesInList } from '../../../store/movies';
import { getMyList } from '../../../store/toSee';
import { getUserData } from '../../../store/user';
import Tooltip from '@material-ui/core/Tooltip';
import styles from './styles';

const Navbar = () => {
  const classes = styles();
  // const toSee = useSelector(getAllMoviesInList);
  const listToSee = useSelector(getMyList);

  const userData = useSelector(getUserData);

  const getListCount = function () {
    const newCount = listToSee.length;
    const countElement = document.getElementById('toSeeCounter');

    if (countElement) {
      const current = parseInt(countElement.innerHTML);
      if (newCount > current) {
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
    return newCount;
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
            <Link to='/listToSee' className='nav-link' href='/#'>
              To see:{' '}
              <span id='toSeeCounter' className={classes.toSeeCounter}>
                {getListCount()}
              </span>
            </Link>
          </div>
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
