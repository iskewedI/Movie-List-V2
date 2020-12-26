import React from 'react';
import Instructions from './../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const SignUpInstructions = props => {
  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text: "First, click on the 'Sign Up' button in the upper right corner.",
      hint: () => {
        const signUpElement = document.getElementById('SignUpButton');

        if (!signUpElement) {
          const meElement = document.getElementById('meButton');

          elementHighlighter.highlightElement(meElement);

          return props.actionProvider.handleReturnMainStage(
            `${meElement.innerHTML}, you've already logged in!`
          );
        }

        elementHighlighter.highlightElement(signUpElement);
      },
    },
    {
      id: 2,
      text:
        'Okay! Here you need to set your favorite user name, email and a very very strong password. Then, press the Sign Up button.',
    },
  ];

  const onFinalize = () => {
    props.actionProvider.handleReturnMainStage(
      `Excelent! Now you should've registered with your account! 'One small step for man, one giant leap for mankind' `
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default SignUpInstructions;
