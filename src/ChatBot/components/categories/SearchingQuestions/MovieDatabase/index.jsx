import React from 'react';
import Instructions from '../../../common/Instructions/index';

const MovieStorage = ({ actionProvider }) => {
  const instructions = [
    {
      id: 1,
      text:
        "The results of movies that you receive by your search is taken from OMDB, an API to get data about IMDB database. They're not mine. I've implemented it, nothing more!",
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      "I hope I've answered all your questions about the movies database :D"
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default MovieStorage;
