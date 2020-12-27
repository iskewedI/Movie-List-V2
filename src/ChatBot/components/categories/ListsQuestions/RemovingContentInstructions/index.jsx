import React from 'react';
import Instructions from '../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const RemovingContentInstructions = ({ actionProvider }) => {
  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text:
        'Logged into your account, and having a list created, you can remove series/movies from the list. You can do it from the lists to see page, or from the search!',
      hint: () => {
        const searchField = document.getElementById('searchField');
        if (searchField) {
          elementHighlighter.highlightElement(searchField);
        }

        const toSeeSummary = document.getElementById('toSeeSummary');
        if (toSeeSummary) {
          elementHighlighter.highlightElement(toSeeSummary);
        }
      },
    },
    {
      id: 2,
      text: 'Find the content you want to destroy and then return to this chat.',
    },
    {
      id: 3,
      text:
        "If you are in the lists to see page, click the content. You'll see a remove icon in the right upper corner. Else, in the search section, check the right bottom button that says 'Remove'",
      hint: () => {
        const properties = { color: '#ffc107' };

        const deleteButtons = document.getElementsByClassName('expandCard--deleteBtn');
        if (deleteButtons.length > 0) {
          return Array.from(deleteButtons).forEach(btn =>
            elementHighlighter.highlightElement(btn, properties)
          );
        }
      },
    },
    {
      id: 4,
      text:
        "Once you clicked the remove button, the lists to see content count should've been decreased and the content in the list shoul've turned RED. The content is waiting to be murdered.",
    },
    {
      id: 5,
      text:
        'When you are ready to make it dissapear, click the SAVE button. If you are feeling bad, just PRESS THE BUTTON and feel the pleasure... Or you can undo the action clickin the RESTORE upper right icon.',
      hint: () => {
        const properties = { color: '#ffc107' };

        const deleteButtons = document.getElementsByClassName('expandCard--deleteBtn');
        if (deleteButtons.length > 0) {
          return Array.from(deleteButtons).forEach(btn =>
            elementHighlighter.highlightElement(btn, properties)
          );
        }
      },
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      `Okey, very good. Remember: Save the changes please, save them, they're in danger, they need your HELP. SAVE THEM.`
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default RemovingContentInstructions;
