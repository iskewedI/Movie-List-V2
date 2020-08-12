import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMoviesInList, removeMovieInList } from "./../../../store/movies";
import { Button } from "@material-ui/core";
import styles from "./styles";

const ListToSee = () => {
  const classes = styles();
  const listToSee = useSelector(getAllMoviesInList);
  const dispatch = useDispatch();

  const createDeleteBtn = (id) => {
    return (
      <Button
        variant="outlined"
        color="primary"
        onClick={() => deleteFromList(id)}
      >
        Delete
      </Button>
    );
  };
  const deleteFromList = (id) => {
    dispatch(removeMovieInList(id));
  };
  return (
    <React.Fragment>
      {listToSee.length === 0 && <div>There's no one movie in the list</div>}
      <ul>
        {listToSee.map((m) => (
          <li key={m.imdbID}>
            {m.Title}
            <span className={classes.buttonDelete}>
              {createDeleteBtn(m.imdbID)}
            </span>
          </li>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ListToSee;
