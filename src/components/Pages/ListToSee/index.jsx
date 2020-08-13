import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllMoviesInList, removeMovieInList } from "./../../../store/movies";
import { Button } from "@material-ui/core";
import styles from "./styles";
import HorizontalAccordion from "../../Common/HorizontalAccordion/refactor";

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
  const types = ["movie", "series"];
  return (
    <React.Fragment>
      <div className={classes.accordionsContainer}>
        {types.map((t, i) => (
          <div key={`Accordion ${i}`} className={classes.accordionRow}>
            <h1>{t}</h1>
            <HorizontalAccordion
              elements={listToSee.list.filter((e) => e.Type === t)}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ListToSee;
