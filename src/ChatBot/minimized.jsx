import React from 'react';
import { Button, Tooltip } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import styles from './styles';

const MinimizedChatbot = ({ onClick }) => {
  const { t } = useTranslation();

  const classes = styles();

  return (
    <Tooltip title={t('tooltips.buttons.open_chatbot')} placement='top'>
      <Button className={classes.compressedChat} onClick={onClick}>
        <img
          src='https://storage.googleapis.com/backend-movieslistv2.appspot.com/Chatbot/HAL_9000.svg'
          alt='HAL Icon'
          width='64px'
          height='64px'
        />
      </Button>
    </Tooltip>
  );
};

export default MinimizedChatbot;
