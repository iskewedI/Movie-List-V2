import React from "react";
import { useSelector } from "react-redux";
import { getAllMoviesInList } from "./../../../store/movies";
import styles from "./styles";
import HorizontalAccordion from "../../Common/HorizontalAccordion/";

const ListToSee = () => {
  const classes = styles();
  const listToSee = useSelector(getAllMoviesInList);
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
