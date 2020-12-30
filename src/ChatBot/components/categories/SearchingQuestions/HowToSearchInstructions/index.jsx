import React from 'react';
import { useTranslation } from 'react-i18next';
import Instructions from '../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const HowToSearchInstructions = ({ actionProvider }) => {
  const { t } = useTranslation();

  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text: t(
        'chatbot.stages.searching_questions.categories.how_to_search.instructions.first.text'
      ),
      hint: () => {
        const searchField = document.getElementById('searchField');

        elementHighlighter.highlightElement(searchField);
      },
    },
    {
      id: 2,
      text: t(
        'chatbot.stages.searching_questions.categories.how_to_search.instructions.second.text'
      ),
      hint: () => {
        const searchButton = document.getElementById('searchButton');

        elementHighlighter.highlightElement(searchButton);
      },
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      t('chatbot.stages.searching_questions.categories.how_to_search.on_done')
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default HowToSearchInstructions;
