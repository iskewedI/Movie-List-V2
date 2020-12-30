import Stages from './Stages';

export default class ActionProvider {
  constructor(createChatBotMessage, setStateFunc, createClientMessage) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
  }

  updateChatbotState(message, stage) {
    this.setState(prevState => ({
      ...prevState,
      messages: [...prevState.messages, message],
      stage: stage !== undefined ? stage : prevState.stage,
    }));
  }

  userQuestions = (() => {
    const handleUser = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.main_help.user_help_requested#',
        {
          widget: 'userQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleSignUp = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.user_help.categories.sign_up.intro#',
        {
          widget: 'signUpQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleLogIn = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.user_help.categories.log_in.intro#',
        {
          widget: 'logInQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleMyInfo = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.user_help.categories.about_my_info.intro#',
        {
          widget: 'myInfoQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    return {
      handleUser,
      handleSignUp,
      handleLogIn,
      handleMyInfo,
    };
  })();

  searchingQuestions = (() => {
    const handleSearch = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.main_help.search_help_requested#',
        {
          widget: 'searchingQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.SEARCHING_QUESTIONS);
    };

    const handleHowToSearch = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.searching_questions.categories.how_to_search.intro#',
        {
          widget: 'howToSearch',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleResultTypes = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.searching_questions.categories.result_types.intro#',
        {
          widget: 'resultTypes',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };
    const handleMovieDatabase = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.searching_questions.categories.movies_database.intro#',
        {
          widget: 'movieDatabase',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    return { handleSearch, handleHowToSearch, handleResultTypes, handleMovieDatabase };
  })();

  listsQuestions = (() => {
    const handleLists = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.main_help.lists_help_requested#',
        {
          widget: 'listsQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.LISTS_QUESTIONS);
    };

    const handleCreatingLists = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.lists_questions.categories.creating_lists.intro#',
        {
          widget: 'creatingListsQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleAddingContent = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.lists_questions.categories.adding_content.intro#',
        {
          widget: 'addingContentQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleRemovingContent = () => {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.lists_questions.categories.removing_content.intro#',
        {
          widget: 'removingContentQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    return {
      handleLists,
      handleCreatingLists,
      handleAddingContent,
      handleRemovingContent,
    };
  })();

  handleReturnMainStage = helpMessage => {
    const botMessage = this.createChatBotMessage(
      `${helpMessage || ''} #chatbot.stages.ask_help.more_help#`
    );

    this.updateChatbotState(botMessage, Stages.ASK_HELP);
  };

  handleMainHelp = asksHelp => {
    if (asksHelp === true) {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.ask_help.help_confirmed#',
        {
          widget: 'helperOptions',
          delay: 100,
        }
      );
      this.updateChatbotState(botMessage, Stages.MAIN_HELP);
    } else {
      const botMessage = this.createChatBotMessage(
        '#chatbot.stages.waiting.bot_waiting#'
      );
      this.updateChatbotState(botMessage, Stages.WAITING);
    }
  };

  handleBackFromWaiting = () => {
    const botMessage = this.createChatBotMessage('#chatbot.stages.waiting.user_return#');

    this.updateChatbotState(botMessage, Stages.ASK_HELP);
  };

  handleRollingBack = () => {
    const userMessage = this.createClientMessage(
      '#chatbot.stages.rolling_back.user_sorry#'
    );

    this.updateChatbotState(userMessage);

    const botMessage = this.createChatBotMessage(
      '#chatbot.stages.rolling_back.user_sorry_bot_response#'
    );

    this.updateChatbotState(botMessage, Stages.ASK_HELP);
  };

  handleDontUnderstood = (message, level) => {
    let extraMessage;

    if (level === 'status') {
      extraMessage = 'chatbot.dont_understood.an_status';
    } else if (level === 'answer') {
      extraMessage = 'chatbot.dont_understood.an_answer';
    } else {
      extraMessage = extraMessage = 'chatbot.dont_understood.anything';
    }

    const botMessage = this.createChatBotMessage(`${message}?? #${extraMessage}#`);

    this.updateChatbotState(botMessage, Stages.ROLLING_BACK);
  };

  handleUserStatus = status => {
    const userStatusResponse = this.createChatBotMessage(
      `#chatbot.stages.user_status.${status}#. #chatbot.ask_guidance#`
    );

    this.updateChatbotState(userStatusResponse, Stages.ASK_HELP);
  };

  handleMessageToUser = message => {
    const botMessage = this.createChatBotMessage(message);

    this.updateChatbotState(botMessage);
  };
}
