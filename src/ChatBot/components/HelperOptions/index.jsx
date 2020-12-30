import React from 'react';
import { useTranslation } from 'react-i18next';
import Options from '../common/Options';

const HelperOptions = props => {
  const { t } = useTranslation();

  const options = [
    {
      id: 1,
      text: t('chatbot.stages.main_help.sections.user_questions'),
      handler: props.actionProvider.userQuestions.handleUser,
    },
    {
      id: 2,
      text: t('chatbot.stages.main_help.sections.search'),
      handler: props.actionProvider.searchingQuestions.handleSearch,
    },
    {
      id: 3,
      text: t('chatbot.stages.main_help.sections.lists'),
      handler: props.actionProvider.listsQuestions.handleLists,
    },
  ];

  return <Options options={options} />;
};

export default HelperOptions;
