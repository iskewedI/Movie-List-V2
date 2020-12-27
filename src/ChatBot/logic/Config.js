import React from 'react';
import { createChatBotMessage } from 'react-chatbot-kit';
import { Stages } from './Stages';
import HelperOptions from '../components/HelperOptions';

import UserQuestions from '../components/categories/UserQuestions';
import SignUpInstructions from './../components/categories/UserQuestions/SignUpInstructions/';
import LogInInstructions from './../components/categories/UserQuestions/LogInInstructions/';
import AboutMyInfo from './../components/categories/UserQuestions/AboutMyInfo/';

import SearchingQuestions from '../components/categories/SearchingQuestions/';
import HowToSearchInstructions from '../components/categories/SearchingQuestions/HowToSearchInstructions/';
import TypesOfResults from '../components/categories/SearchingQuestions/TypesOfResults/';
import MovieDatabase from '../components/categories/SearchingQuestions/MovieDatabase/';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import HalIcon from '../images/HAL_9000.svg';

export const getConfig = handleOpen => ({
  botName: 'HAL-9001',
  initialMessages: [createChatBotMessage(`Hello! How are you?`)],
  state: {
    stage: Stages.USER_STATUS,
  },
  customComponents: {
    botAvatar: () => <img src={HalIcon} alt='HAL-9001 Icon' width='32px' />,
    header: () => (
      <div className='chatbotHeader'>
        HAL-9001
        <button onClick={() => handleOpen(false)} className='compressChatBtn'>
          <ExpandMoreIcon />
        </button>
      </div>
    ),
  },
  widgets: [
    {
      widgetName: 'helperOptions',
      widgetFunc: props => <HelperOptions {...props} />,
    },
    {
      widgetName: 'userQuestions',
      widgetFunc: props => <UserQuestions {...props} />,
    },
    {
      widgetName: 'signUpQuestions',
      widgetFunc: props => <SignUpInstructions {...props} />,
    },
    {
      widgetName: 'logInQuestions',
      widgetFunc: props => <LogInInstructions {...props} />,
    },
    {
      widgetName: 'myInfoQuestions',
      widgetFunc: props => <AboutMyInfo {...props} />,
    },
    {
      widgetName: 'searchingQuestions',
      widgetFunc: props => <SearchingQuestions {...props} />,
    },
    {
      widgetName: 'howToSearch',
      widgetFunc: props => <HowToSearchInstructions {...props} />,
    },
    {
      widgetName: 'resultTypes',
      widgetFunc: props => <TypesOfResults {...props} />,
    },
    {
      widgetName: 'movieDatabase',
      widgetFunc: props => <MovieDatabase {...props} />,
    },
  ],
  customStyles: {
    botMessageBox: {
      backgroundColor: '#476377d9',
    },
    chatButton: {
      backgroundColor: '#477494d9',
    },
  },
});
