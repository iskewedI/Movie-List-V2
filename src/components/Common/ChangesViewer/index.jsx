import React from 'react';
import Button from '@material-ui/core/Button';

import styles from './styles';

const ChangesViewer = ({ changes, onSaveChanges }) => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <ul>
        Added:
        {changes.added.map((i) => (
          <li key={i.imdbID}>{i.Title}</li>
        ))}
      </ul>
      <ul>
        Removed:
        {changes.removed.map((i) => (
          <li key={i.imdbID}>{i.Title}</li>
        ))}
      </ul>
      <Button
        variant="contained"
        color="primary"
        onClick={onSaveChanges}
      >
        Save
      </Button>
    </div>
  );
};

export default ChangesViewer;
