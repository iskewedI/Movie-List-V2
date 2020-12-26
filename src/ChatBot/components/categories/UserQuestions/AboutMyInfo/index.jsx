import React from 'react';
import Instructions from '../../../common/Instructions/index';

const AboutMyInfo = ({ actionProvider }) => {
  const instructions = [
    {
      id: 1,
      text:
        "Your info is stored in a secured on-line database, with the data you've putted on. I don't share this information with any external part nor company.",
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      "I hope I've answered all your questions about your info :)"
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default AboutMyInfo;
