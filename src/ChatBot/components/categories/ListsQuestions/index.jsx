import React from 'react';
import Options from '../../common/Options';

const ListsQuestions = props => {
  const options = [
    {
      id: 1,
      text: 'Creating a list',
      handler: props.actionProvider.listsQuestions.handleCreatingLists,
    },
    {
      id: 2,
      text: 'Adding content to my list',
      handler: props.actionProvider.listsQuestions.handleAddingContent,
    },
    {
      id: 3,
      text: 'Removing content from my list',
      handler: props.actionProvider.listsQuestions.handleRemovingContent,
    },
    {
      id: 3,
      text: 'Where are this data stored on?',
      handler: props.actionProvider.listsQuestions.handleDataStorage,
    },
  ];

  return <Options options={options} />;
};

export default ListsQuestions;
