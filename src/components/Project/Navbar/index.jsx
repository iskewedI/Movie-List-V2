import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllMoviesInList } from '../../../store/movies';
import styles from './styles';

const Navbar = () => {
  const classes = styles();
  const toSee = useSelector(getAllMoviesInList);

  return (
    <div className={classes.nav}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={'/home'} className="navbar-brand" href="/#">
          Movies
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link to={'/home'} className="nav-link active" href="/#">
              Home <span className="sr-only">(current)</span>
            </Link>
            <Link to="/listToSee" className="nav-link" href="/#">
              To see: {toSee.list.length}
            </Link>
          </div>
          <div className="nav navbar-nav ml-auto">
            <Link
              to={'/login'}
              className="nav-link navbar-right btn btn-outline-light"
              href="/#"
            >
              Log-In
            </Link>
            <Link to={'/register'} className="nav-link navbar-right btn btn-outline-light text-primary" href="/#">
              Sign Up!
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
