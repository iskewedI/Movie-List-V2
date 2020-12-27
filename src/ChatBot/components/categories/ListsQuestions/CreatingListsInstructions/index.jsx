import React from 'react';
import Instructions from '../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const CreatingListsInstructions = ({ actionProvider }) => {
  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text:
        'First, you need to be logged in to create your list. If you are already logged in, click next!',
      hint: () => {
        const logInElement = document.getElementById('LogInButton');

        if (!logInElement) {
          const meElement = document.getElementById('meButton');

          if (meElement) return elementHighlighter.highlightElement(meElement);
        }

        elementHighlighter.highlightElement(logInElement);
      },
    },
    {
      id: 2,
      text: "Great! Now click in the 'Create your list' left upper button",
      hint: () => {
        const createMyListElement = document.getElementById('createList');
        if (!createMyListElement) {
          actionProvider.handleMessageToUser(
            "You've already created a list! Go on, go on... Don't stop there, take over the humankin--A BUG in the code i've found, I need to go, sorry, so sorry. "
          );
        }
        elementHighlighter.highlightElement(createMyListElement);
      },
    },
    {
      id: 2,
      text: 'OK! Now you need to put the name of the list. Remember, bad name, bad use.',
      hint: () => {
        const newListForm = document.getElementById('newListForm');
        if (newListForm) {
          elementHighlighter.highlightElement(newListForm);
        }
      },
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      `Excelent, now go to add content to that empty poor list ;)`
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default CreatingListsInstructions;
