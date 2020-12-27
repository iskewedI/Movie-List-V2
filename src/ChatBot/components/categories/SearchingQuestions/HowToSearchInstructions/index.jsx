import React from 'react';
import Instructions from '../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const HowToSearchInstructions = ({ actionProvider }) => {
  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text:
        'First, click on the white area in the center of the page and write the name of the movie/serie you are looking for.',
      hint: () => {
        const searchField = document.getElementById('searchField');

        elementHighlighter.highlightElement(searchField);
      },
    },
    {
      id: 2,
      text: 'Perfect! Now, click in the Search button and see the magic!',
      hint: () => {
        const searchButton = document.getElementById('searchButton');

        elementHighlighter.highlightElement(searchButton);
      },
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      `Great! Now you should've seen the results of your search!`
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default HowToSearchInstructions;
