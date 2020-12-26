import React from 'react';
import styles from './styles';

const Options = ({ options }) => {
  const classes = styles();

  const optionsMarkup = options.map(option => (
    <button
      className={`${classes.option} linkButton`}
      key={option.id}
      onClick={option.handler}
    >
      {option.text}
    </button>
  ));

  return <div className={classes.optionsContainter}>{optionsMarkup}</div>;
};

export default Options;
