import React from 'react';
import { useTranslation } from 'react-i18next';
import Instructions from '../../../common/Instructions/index';

const MovieStorage = ({ actionProvider }) => {
  const { t } = useTranslation();

  const instructions = [
    {
      id: 1,
      text: t(
        'chatbot.stages.searching_questions.categories.movies_database.instructions.first.text'
      ),
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      t('chatbot.stages.searching_questions.categories.movies_database.on_done')
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default MovieStorage;
