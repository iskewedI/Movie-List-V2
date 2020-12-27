import React from 'react';
import Options from '../common/Options';

const HelperOptions = props => {
  const options = [
    {
      id: 1,
      text: 'User questions',
      handler: props.actionProvider.userQuestions.handleUser,
    },
    {
      id: 2,
      text: 'Searching movies',
      handler: props.actionProvider.searchingQuestions.handleSearch,
    },
    { id: 3, text: 'Lists to see', handler: () => {} },
  ];

  return <Options options={options} />;
};

export default HelperOptions;
