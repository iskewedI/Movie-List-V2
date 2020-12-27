import React from 'react';
import Instructions from '../../../common/Instructions/index';

const TypesOfResults = ({ actionProvider }) => {
  const instructions = [
    {
      id: 1,
      text:
        "The results can be both movies and series. Just type what you want, and you'll able to find what you are looking for!",
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      "I hope I've answered all your questions about the types of results :D"
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default TypesOfResults;
