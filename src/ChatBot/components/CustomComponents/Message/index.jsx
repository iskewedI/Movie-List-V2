import React, { useState } from 'react';

import { useTranslation } from 'react-i18next';

const getDynamicMessage = (msg, t) => {
  const findDynamicValues = /#(.*?)#/g;

  return msg.replace(findDynamicValues, value => t(value.replace(/#/g, '')));
};

export const BotMessage = ({ message, loader }) => {
  const { t } = useTranslation();

  const [loading, setLoading] = useState(true);

  const randomDelay = Math.random() * 1500;

  setTimeout(() => setLoading(false), randomDelay);

  return (
    <div
      className='react-chatbot-kit-chat-bot-message'
      style={{ backgroundColor: ' rgba(71, 99, 119, 0.85)' }}
    >
      {loading && loader}
      {!loading && <span>{getDynamicMessage(message, t)}</span>}
      <div
        className='react-chatbot-kit-chat-bot-message-arrow'
        style={{ borderRightColor: 'rgba(71, 99, 119, 0.85)' }}
      ></div>
    </div>
  );
};

export const UserMessage = ({ message }) => {
  const { t } = useTranslation();

  return (
    <div className='react-chatbot-kit-user-chat-message'>
      <span>{getDynamicMessage(message, t)}</span>
      <div className='react-chatbot-kit-user-chat-message-arrow'></div>
    </div>
  );
};
