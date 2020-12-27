import React from 'react';
import Options from '../../common/Options';

const SearchingQuestions = props => {
  const options = [
    {
      id: 1,
      text: 'How to search',
      handler: props.actionProvider.searchingQuestions.handleHowToSearch,
    },
    {
      id: 2,
      text: 'Types of results',
      handler: props.actionProvider.searchingQuestions.handleResultTypes,
    },
    {
      id: 3,
      text: 'Where are the movies stored?',
      handler: props.actionProvider.searchingQuestions.handleMovieDatabase,
    },
  ];

  return <Options options={options} />;
};

export default SearchingQuestions;
