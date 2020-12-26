import React from 'react';
import Options from '../../common/Options';

const HelperOptions = props => {
  const options = [
    { id: 1, text: 'Signing Up', handler: props.actionProvider.handleSignUpQuestions },
    { id: 2, text: 'Logging In', handler: props.actionProvider.handleLogInQuestions },
    {
      id: 3,
      text: 'Where is my info stored in?',
      handler: props.actionProvider.handleMyInfoQuestions,
    },
  ];

  return <Options options={options} />;
};

export default HelperOptions;
