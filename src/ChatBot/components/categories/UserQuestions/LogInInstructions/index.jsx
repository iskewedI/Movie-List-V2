import React from 'react';
import { useTranslation } from 'react-i18next';
import Instructions from '../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const LogInInstructions = ({ actionProvider }) => {
  const { t } = useTranslation();

  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text: t('chatbot.stages.user_help.categories.log_in.instructions.first.text'),
      hint: () => {
        const logInElement = document.getElementById('LogInButton');

        if (!logInElement) {
          const meElement = document.getElementById('meButton');

          elementHighlighter.highlightElement(meElement);

          return actionProvider.handleReturnMainStage(
            `${meElement.innerHTML}, ${t(
              'chatbot.stages.user_help.categories.log_in.instructions.first.hint_error'
            )}`
          );
        }

        elementHighlighter.highlightElement(logInElement);
      },
    },
    {
      id: 2,
      text: t('chatbot.stages.user_help.categories.log_in.instructions.second.text'),
    },
  ];

  const onFinalize = () => {
    actionProvider.handleReturnMainStage(
      t('chatbot.stages.user_help.categories.log_in.on_done')
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default LogInInstructions;
