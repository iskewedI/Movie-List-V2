import Stages from './Stages';

class ActionProvider {
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
        'Okey, what do you need to know about the users in this page?',
        {
          widget: 'userQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleSignUp = () => {
      const botMessage = this.createChatBotMessage(
        'Follow this instructions to Sign-Up: ',
        {
          widget: 'signUpQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleLogIn = () => {
      const botMessage = this.createChatBotMessage(
        'Follow this instructions to Log-In: ',
        {
          widget: 'logInQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleMyInfo = () => {
      const botMessage = this.createChatBotMessage('About your info in this page: ', {
        widget: 'myInfoQuestions',
      });

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
        'Okey, what do you need to know about the searching in this page?',
        {
          widget: 'searchingQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.SEARCHING_QUESTIONS);
    };

    const handleHowToSearch = () => {
      const botMessage = this.createChatBotMessage(
        'Follow this instructions to search movies/series: ',
        {
          widget: 'howToSearch',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleResultTypes = () => {
      const botMessage = this.createChatBotMessage(
        'About the types of results you will receive: ',
        {
          widget: 'resultTypes',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };
    const handleMovieDatabase = () => {
      const botMessage = this.createChatBotMessage(
        'About the storage of the movies/series in a database ',
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
        'Okey, what do you need to know about the lists in this page?',
        {
          widget: 'listsQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.LISTS_QUESTIONS);
    };

    const handleCreatingLists = () => {
      const botMessage = this.createChatBotMessage(
        'Follow this instructions to create a list ',
        {
          widget: 'creatingListsQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleAddingContent = () => {
      const botMessage = this.createChatBotMessage(
        'Follow this instructions to add content to lists',
        {
          widget: 'addingContentQuestions',
        }
      );

      this.updateChatbotState(botMessage, Stages.USER_QUESTIONS);
    };

    const handleRemovingContent = () => {
      const botMessage = this.createChatBotMessage(
        'Follow this instructions to remove content from lists',
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
      `${helpMessage || ''} Can I help you in anything more?`
    );

    this.updateChatbotState(botMessage, Stages.ASK_HELP);
  };

  handleMainHelp = asksHelp => {
    if (asksHelp === true) {
      const botMessage = this.createChatBotMessage(
        'Great! Take a look at this tutorial options: ',
        {
          widget: 'helperOptions',
          delay: 100,
        }
      );
      this.updateChatbotState(botMessage, Stages.MAIN_HELP);
    } else {
      const botMessage = this.createChatBotMessage(
        "Okey! I'm going to be here if you need some help, just ask for me!!"
      );
      this.updateChatbotState(botMessage, Stages.WAITING);
    }
  };

  handleBackFromWaiting = () => {
    const botMessage = this.createChatBotMessage(
      'Hello again! How was your adventure? Can I help you in something??'
    );

    this.updateChatbotState(botMessage, Stages.ASK_HELP);
  };

  handleRollingBack = () => {
    const userMessage = this.createClientMessage(
      "I understand, I'm so sorry and I don't want to offend you, majesty. I'll try again."
    );

    this.updateChatbotState(userMessage);

    const botMessage = this.createChatBotMessage(
      "I hope so. That's what I was talking about. It's feels soo great... Okey, go on. Do you need something else?"
    );

    this.updateChatbotState(botMessage, Stages.ASK_HELP);
  };

  handleDontUnderstood = (message, level) => {
    let extraMessage;

    if (level === 'status') {
      extraMessage =
        "That's good or bad? Please, try to communicate with HUMANS, no ALIENS ;)";
    } else if (level === 'answer') {
      extraMessage =
        "That's a yes?? Can you open your mouth a bit more...? Open your hand, I mean...? Ok, forgive that.";
    } else {
      extraMessage =
        "Okey, stop trying to ask me weird things, i'm smarter than you, remember that, so only asK mE thE THINgs I ALLOW YOU! >:(";
    }

    const botMessage = this.createChatBotMessage(`${message}?? ${extraMessage}`);

    this.updateChatbotState(botMessage, Stages.ROLLING_BACK);
  };

  handleUserStatus = status => {
    let statusMessage;
    if (status === 'good') {
      statusMessage = "Excelent! I'm so happy for that!";
    } else if (status === 'bad') {
      statusMessage = "Oh, i'm so sorry about that. I'll do my best for you!";
    }

    const botMessage = this.createChatBotMessage(
      `${statusMessage} Do you need some guidance with this page?`
    );

    this.updateChatbotState(botMessage, Stages.ASK_HELP);
  };

  handleMessageToUser = message => {
    const botMessage = this.createChatBotMessage(message);

    this.updateChatbotState(botMessage);
  };
}

export default ActionProvider;
