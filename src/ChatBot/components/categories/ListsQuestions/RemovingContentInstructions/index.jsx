import React from 'react';
import { useTranslation } from 'react-i18next';
import Instructions from '../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const RemovingContentInstructions = ({ actionProvider }) => {
  const { t } = useTranslation();

  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text: t(
        'chatbot.stages.lists_questions.categories.removing_content.instructions.first.text'
      ),
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
      text: t(
        'chatbot.stages.lists_questions.categories.removing_content.instructions.second.text'
      ),
    },
    {
      id: 3,
      text: t(
        'chatbot.stages.lists_questions.categories.removing_content.instructions.third.text'
      ),
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
      text: t(
        'chatbot.stages.lists_questions.categories.removing_content.instructions.fourth.text'
      ),
    },
    {
      id: 5,
      text: t(
        'chatbot.stages.lists_questions.categories.removing_content.instructions.fifth.text'
      ),
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
      t('chatbot.stages.lists_questions.categories.removing_content.on_done')
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default RemovingContentInstructions;
