import React from 'react';
import { useSelector } from 'react-redux';
import { getMyList, getListName } from './../../../store/toSee';
import styles from './styles';
import HorizontalAccordion from '../../Common/HorizontalAccordion/';

const ListToSee = () => {
  const classes = styles();

  const listName = useSelector(getListName);

  const listToSee = useSelector(getMyList);

  const types = ['Movies', 'Series'];

  return (
    <React.Fragment>
      <h2 className={classes.listName}>{listName}</h2>
      <div className={classes.accordionsContainer}>
        {types.map((t, i) => (
          <div key={`Accordion ${i}`} className={classes.accordionRow}>
            <h1 className={classes.titles}>{t}</h1>
            <HorizontalAccordion
              elements={listToSee.filter(e =>
                t.toUpperCase().includes(e.Type.toUpperCase())
              )}
              type={t}
            />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default ListToSee;
