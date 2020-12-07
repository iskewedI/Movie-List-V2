import React from 'react';
import { useSelector } from 'react-redux';
// import { getAllMoviesInList } from './../../../store/toSee';
import styles from './styles';
import HorizontalAccordion from '../../Common/HorizontalAccordion/';

const ListToSee = () => {
  const classes = styles();
  // const listToSee = useSelector(getAllMoviesInList);
  const listToSee = { list: [] };
  const types = ['Movies', 'Series'];
  
  return (
    <React.Fragment>
      <div className={classes.accordionsContainer}>
        {types.map((t, i) => (
          <div key={`Accordion ${i}`} className={classes.accordionRow}>
            <h1 style={{ margin: 10, userSelect: "none" }}>{t}</h1>
            <HorizontalAccordion
              elements={listToSee.list.filter(e =>
                t.toUpperCase().includes(e.Type.toUpperCase())
              )}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ListToSee;
