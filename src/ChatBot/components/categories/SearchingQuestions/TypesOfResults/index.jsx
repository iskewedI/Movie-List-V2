import React from 'react';
import { useTranslation } from 'react-i18next';
import Instructions from '../../../common/Instructions/index';

const TypesOfResults = ({ actionProvider }) => {
  const { t } = useTranslation();

  const instructions = [
    {
      id: 1,
      text: t(
        'chatbot.stages.searching_questions.categories.result_types.instructions.first.text'
      ),
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      t('chatbot.stages.searching_questions.categories.result_types.on_done')
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default TypesOfResults;
