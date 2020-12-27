import React, { useState } from 'react';
import Chatbot from 'react-chatbot-kit';
import ActionProvider from './logic/ActionProvider';
import MessageParser from './logic/MessageParser.js';
import { getConfig } from './logic/Config';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import HalIcon from './images/HAL_9000.svg';
import styles from './styles';

const ChatBot = () => {
  const classes = styles();

  const [open, setOpen] = useState(false);

  const config = getConfig(setOpen);

  const storageKey = 'HAL_chatbot_messages';

  const saveMessages = messages => {
    localStorage.setItem(storageKey, JSON.stringify(messages));
  };

  const loadMessages = () => {
    const messages = JSON.parse(localStorage.getItem(storageKey));
    return messages;
  };

  return (
    <div className={classes.chatBot}>
      <header>
        {!open && (
          <Tooltip
            title='Open HAL-9001 to take some guidance about how to use this page!'
            placement='top'
          >
            <Button className={classes.compressedChat} onClick={() => setOpen(!open)}>
              <img src={HalIcon} alt='HAL Icon' width='64px' />
            </Button>
          </Tooltip>
        )}

        {open && (
          <div>
            <Chatbot
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
              messageHistory={loadMessages()}
              saveMessages={saveMessages}
              headerText='HAL-9001'
            />
          </div>
        )}
      </header>
    </div>
  );
};

export default ChatBot;
