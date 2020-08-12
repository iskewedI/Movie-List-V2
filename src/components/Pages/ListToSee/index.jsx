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
  const types = ["movie", "serie"];
  return (
    <React.Fragment>
      {listToSee.list.length === 0 && (
        <div>There's no one movie in the list</div>
      )}
      <ul>
        {types.map((t) => (
          <ul key={`${t}ID`}>
            {`${t}s`}
            {listToSee.list
              .filter((elem) => elem.Type === t)
              .map((e) => (
                <li key={e.imdbID}>
                  {e.Title}{" "}
                  <span className={classes.buttonDelete}>
                    {createDeleteBtn(e.imdbID)}
                  </span>
                </li>
              ))}
          </ul>
        ))}
      </ul>
    </React.Fragment>
  );
};

export default ListToSee;
