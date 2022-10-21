import React from 'react';
import { useTranslation } from 'react-i18next';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from './logic/ActionProvider';
import getMessageParser from './logic/MessageParser.js';
import { getConfig } from './logic/Config';

const ChatBot = ({ onClose }) => {
  const { t } = useTranslation();

  const config = getConfig(onClose, t);

  return (
    <div>
      <Chatbot
        config={config}
        actionProvider={ActionProvider}
        messageParser={getMessageParser(t)}
        headerText='HAL-9001'
      />
    </div>
  );
};

export default ChatBot;
