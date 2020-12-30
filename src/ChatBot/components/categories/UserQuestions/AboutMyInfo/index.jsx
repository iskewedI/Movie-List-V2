import React from 'react';
import { useTranslation } from 'react-i18next';
import Instructions from '../../../common/Instructions/index';

const AboutMyInfo = ({ actionProvider }) => {
  const { t } = useTranslation();

  const instructions = [
    {
      id: 1,
      text: t(
        'chatbot.stages.user_help.categories.about_my_info.instructions.first.text'
      ),
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      t('chatbot.stages.user_help.categories.about_my_info.on_done')
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default AboutMyInfo;
