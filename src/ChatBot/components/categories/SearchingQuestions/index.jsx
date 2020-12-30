import React from 'react';
import Options from '../../common/Options';
import { useTranslation } from 'react-i18next';

const SearchingQuestions = props => {
  const { t } = useTranslation();

  const options = [
    {
      id: 1,
      text: t('chatbot.stages.searching_questions.categories.how_to_search.label'),
      handler: props.actionProvider.searchingQuestions.handleHowToSearch,
    },
    {
      id: 2,
      text: t('chatbot.stages.searching_questions.categories.result_types.label'),
      handler: props.actionProvider.searchingQuestions.handleResultTypes,
    },
    {
      id: 3,
      text: t('chatbot.stages.searching_questions.categories.movies_database.label'),
      handler: props.actionProvider.searchingQuestions.handleMovieDatabase,
    },
  ];

  return <Options options={options} />;
};

export default SearchingQuestions;
