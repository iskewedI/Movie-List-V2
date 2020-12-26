import React from 'react';
import Instructions from '../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const LogInInstructions = ({ actionProvider }) => {
  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text: "First, click on the 'Log-In' button in the upper right corner.",
      hint: () => {
        const logInElement = document.getElementById('LogInButton');

        if (!logInElement) {
          const meElement = document.getElementById('meButton');

          elementHighlighter.highlightElement(meElement);

          return actionProvider.handleReturnMainStage(
            `${meElement.innerHTML}, you've already logged in!`
          );
        }

        elementHighlighter.highlightElement(logInElement);
      },
    },
    {
      id: 2,
      text:
        'Good! Here you need to set your user email and your secret password, and then press the Login button.',
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(`Great! Now you should've logged in!`);
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default LogInInstructions;
