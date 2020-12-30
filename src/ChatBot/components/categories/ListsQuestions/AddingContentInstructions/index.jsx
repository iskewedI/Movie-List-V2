import React from 'react';
import { useTranslation } from 'react-i18next';
import Instructions from '../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const AddingContentInstructions = ({ actionProvider }) => {
  const { t } = useTranslation();

  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text: t(
        'chatbot.stages.lists_questions.categories.adding_content.instructions.first.text'
      ),
      hint: () => {
        const searchField = document.getElementById('searchField');

        elementHighlighter.highlightElement(searchField);
      },
    },
    {
      id: 2,
      text: t(
        'chatbot.stages.lists_questions.categories.adding_content.instructions.second.text'
      ),
    },
    {
      id: 3,
      text: t(
        'chatbot.stages.lists_questions.categories.adding_content.instructions.third.text'
      ),
      hint: () => {
        const toSeeSummary = document.getElementById('toSeeSummary');
        if (toSeeSummary) {
          elementHighlighter.highlightElement(toSeeSummary);
        }
      },
    },
    {
      id: 4,
      text: t(
        'chatbot.stages.lists_questions.categories.adding_content.instructions.fourth.text'
      ),
      hint: () => {
        const toSeeSummary = document.getElementById('toSeeSummary');
        if (toSeeSummary) {
          elementHighlighter.highlightElement(toSeeSummary);
        }
      },
    },
    {
      id: 5,
      text: t(
        'chatbot.stages.lists_questions.categories.adding_content.instructions.fifth.text'
      ),
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
      t('chatbot.stages.lists_questions.categories.adding_content.on_done')
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default AddingContentInstructions;
