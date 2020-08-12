import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllMoviesInList } from "../../store/movies";
import styles from "./styles";

const Navbar = () => {
  const classes = styles();
  const toSee = useSelector(getAllMoviesInList);

  return (
    <div className={classes.nav}>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link to={"/home"} className="navbar-brand" href="/#">
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
            <Link to={"/home"} className="nav-link active" href="/#">
              Home <span className="sr-only">(current)</span>
            </Link>
            <Link to="/listToSee" className="nav-link" href="/#">
              To see: {toSee.length}
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
