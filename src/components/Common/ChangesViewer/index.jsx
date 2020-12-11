import React from 'react';

import styles from './styles';

const ChangesViewer = ({ changes }) => {
  const classes = styles();

  return (
    <div className={classes.container}>
      <ul>
        Added:{' '}
        {changes.added.map(i => (
          <li key={i.imdbID}>{i.Title}</li>
        ))}
      </ul>
      <ul>
        Added:{' '}
        {changes.removed.map(i => (
          <li key={i.imdbID}>{i.Title}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChangesViewer;
