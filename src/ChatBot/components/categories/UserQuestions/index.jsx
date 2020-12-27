import React from 'react';
import Options from '../../common/Options';

const UserQuestions = props => {
  const options = [
    {
      id: 1,
      text: 'Signing Up',
      handler: props.actionProvider.userQuestions.handleSignUp,
    },
    {
      id: 2,
      text: 'Logging In',
      handler: props.actionProvider.userQuestions.handleLogIn,
    },
    {
      id: 3,
      text: 'Where is my info stored in?',
      handler: props.actionProvider.userQuestions.handleMyInfo,
    },
  ];

  return <Options options={options} />;
};

export default UserQuestions;
