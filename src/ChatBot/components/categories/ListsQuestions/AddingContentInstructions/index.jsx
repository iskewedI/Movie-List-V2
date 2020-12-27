import React from 'react';
import Instructions from '../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const AddingContentInstructions = ({ actionProvider }) => {
  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text:
        'Logged into your account, and having a list created, you can now add the content to it!! First, search the movie you want, and return to this chat.',
      hint: () => {
        const searchField = document.getElementById('searchField');

        elementHighlighter.highlightElement(searchField);
      },
    },
    {
      id: 2,
      text:
        "Very good! Now you should've the movie/serie in the aim. Check below the movie image, do you see an PLUS icon that says 'Add' no? Press it",
    },
    {
      id: 3,
      text:
        'Did you note that, when you press that button before, the number in the "To See" left upper section has been increased? Magic',
      hint: () => {
        const toSeeSummary = document.getElementById('toSeeSummary');
        if (toSeeSummary) {
          elementHighlighter.highlightElement(toSeeSummary);
        }
      },
    },
    {
      id: 4,
      text:
        'Click in the "To See" section to check your new changes! The "added" movies will be displayed in green',
      hint: () => {
        const toSeeSummary = document.getElementById('toSeeSummary');
        if (toSeeSummary) {
          elementHighlighter.highlightElement(toSeeSummary);
        }
      },
    },
    {
      id: 5,
      text:
        'When you are ready, click the "save" button to store the changes you made to the database!',
      hint: () => {
        const saveButton = document.getElementById('saveChanges');
        if (saveButton) {
          elementHighlighter.highlightElement(saveButton);
        }
      },
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      `Excelent! And remember, don't FORGET TO SAVE ;)`
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default AddingContentInstructions;
