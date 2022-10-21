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

import ListsQuestions from '../components/categories/ListsQuestions/';
import CreatingListsInstructions from '../components/categories/ListsQuestions/CreatingListsInstructions/';
import AddingContentInstructions from '../components/categories/ListsQuestions/AddingContentInstructions/';
import RemovingContentInstructions from '../components/categories/ListsQuestions/RemovingContentInstructions/';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { BotMessage, UserMessage } from '../components/CustomComponents/Message/';

export const getConfig = handleOpen => ({
  botName: 'HAL-9001',
  initialMessages: [createChatBotMessage('#chatbot.greet#')],
  state: {
    stage: Stages.USER_STATUS,
  },
  customComponents: {
    botAvatar: () => (
      <img
        src='https://storage.googleapis.com/backend-movieslistv2.appspot.com/Chatbot/HAL_9000.svg'
        alt='HAL-9001 Icon'
        width='32px'
      />
    ),
    header: () => (
      <button className='chatbotHeader' onClick={() => handleOpen(false)}>
        HAL-9001
        <div
          href='minimize'
          className='compressChatBtn'
          title='Maximize and minimize chatbot'
        >
          <ExpandMoreIcon />
        </div>
      </button>
    ),
    botChatMessage: props => <BotMessage {...props} />,
    userChatMessage: props => <UserMessage {...props} />,
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
    {
      widgetName: 'listsQuestions',
      widgetFunc: props => <ListsQuestions {...props} />,
    },
    {
      widgetName: 'creatingListsQuestions',
      widgetFunc: props => <CreatingListsInstructions {...props} />,
    },
    {
      widgetName: 'addingContentQuestions',
      widgetFunc: props => <AddingContentInstructions {...props} />,
    },
    {
      widgetName: 'removingContentQuestions',
      widgetFunc: props => <RemovingContentInstructions {...props} />,
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
