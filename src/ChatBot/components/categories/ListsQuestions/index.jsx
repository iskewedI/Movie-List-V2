import React from 'react';
import { useTranslation } from 'react-i18next';
import Options from '../../common/Options';

const ListsQuestions = props => {
  const { t } = useTranslation();

  const options = [
    {
      id: 1,
      text: t('chatbot.stages.lists_questions.categories.creating_lists.label'),
      handler: props.actionProvider.listsQuestions.handleCreatingLists,
    },
    {
      id: 2,
      text: t('chatbot.stages.lists_questions.categories.adding_content.label'),
      handler: props.actionProvider.listsQuestions.handleAddingContent,
    },
    {
      id: 3,
      text: t('chatbot.stages.lists_questions.categories.removing_content.label'),
      handler: props.actionProvider.listsQuestions.handleRemovingContent,
    },
  ];

  return <Options options={options} />;
};

export default ListsQuestions;
