import React from 'react';
import { useTranslation } from 'react-i18next';
import Instructions from './../../../common/Instructions/index';
import ElementHighlighter from '../../../common/ElementHighlighter';

const SignUpInstructions = props => {
  const { t } = useTranslation();

  const elementHighlighter = new ElementHighlighter();

  const instructions = [
    {
      id: 1,
      text: t('chatbot.stages.user_help.categories.sign_up.instructions.first.text'),
      hint: () => {
        const signUpElement = document.getElementById('SignUpButton');

        if (!signUpElement) {
          const meElement = document.getElementById('meButton');

          elementHighlighter.highlightElement(meElement);

          return props.actionProvider.handleReturnMainStage(
            `${meElement.innerHTML}, ${t(
              'chatbot.stages.user_help.categories.sign_up.instructions.first.hint_error'
            )}`
          );
        }

        elementHighlighter.highlightElement(signUpElement);
      },
    },
    {
      id: 2,
      text: t('chatbot.stages.user_help.categories.sign_up.instructions.second.text'),
    },
  ];

  const onFinalize = () => {
    props.actionProvider.handleReturnMainStage(
      t('chatbot.stages.user_help.categories.sign_up.on_done')
    );
  };

  return <Instructions instructions={instructions} handleDone={onFinalize} />;
};

export default SignUpInstructions;
