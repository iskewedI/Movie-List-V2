import React from 'react';
import { useTranslation } from 'react-i18next';
import Instructions from '../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const CreatingListsInstructions = ({ actionProvider }) => {
  const { t } = useTranslation();

  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text: t(
        'chatbot.stages.lists_questions.categories.creating_lists.instructions.first.text'
      ),
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
      text: t(
        'chatbot.stages.lists_questions.categories.creating_lists.instructions.second.text'
      ),
      hint: () => {
        const createMyListElement = document.getElementById('createList');
        if (!createMyListElement) {
          actionProvider.handleMessageToUser(
            t(
              'chatbot.stages.lists_questions.categories.creating_lists.instructions.second.hint_error'
            )
          );
        }
        elementHighlighter.highlightElement(createMyListElement);
      },
    },
    {
      id: 3,
      text: t(
        'chatbot.stages.lists_questions.categories.creating_lists.instructions.third.text'
      ),
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
      t('chatbot.stages.lists_questions.categories.creating_lists.on_done')
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default CreatingListsInstructions;
