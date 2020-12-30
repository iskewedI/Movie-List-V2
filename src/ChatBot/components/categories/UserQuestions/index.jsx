import React from 'react';
import { useTranslation } from 'react-i18next';
import Options from '../../common/Options';

const UserQuestions = props => {
  const { t } = useTranslation();

  const options = [
    {
      id: 1,
      text: t('chatbot.stages.user_help.categories.sign_up.label'),
      handler: props.actionProvider.userQuestions.handleSignUp,
    },
    {
      id: 2,
      text: t('chatbot.stages.user_help.categories.log_in.label'),
      handler: props.actionProvider.userQuestions.handleLogIn,
    },
    {
      id: 3,
      text: t('chatbot.stages.user_help.categories.about_my_info.label'),
      handler: props.actionProvider.userQuestions.handleMyInfo,
    },
  ];

  return <Options options={options} />;
};

export default UserQuestions;
