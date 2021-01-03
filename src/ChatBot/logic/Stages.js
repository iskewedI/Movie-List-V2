export const Stages = {
  WAITING: 0,
  ROLLING_BACK: 1,
  USER_STATUS: 2,
  ASK_HELP: 3,
  MAIN_HELP: 4,
  USER_QUESTIONS: 5,
  SEARCHING_QUESTIONS: 6,
  LISTS_QUESTIONS: 7,
};

export const stageManager = (actionProvider, t) => {
  const stageMap = new Map();

  stageMap.set(Stages.WAITING, message => {
    actionProvider.handleBackFromWaiting();
  });

  stageMap.set(Stages.ROLLING_BACK, message => {
    actionProvider.handleRollingBack();
  });

  stageMap.set(Stages.USER_STATUS, message => {
    const notWordCharacters = /\W|\d/g;
    const cleanedMessage = message.replace(notWordCharacters, ' ');

    let wordsList = cleanedMessage.split(' ');

    const positiveStatus = t('chatbot.stages.user_status.positive_responses').split(',');

    const negativeStatus = t('chatbot.stages.user_status.negative_responses').split(',');

    for (const word of wordsList) {
      if (positiveStatus.includes(word)) {
        return actionProvider.handleUserStatus('good');
      } else if (negativeStatus.includes(word)) {
        return actionProvider.handleUserStatus('bad');
      }
    }

    return actionProvider.handleDontUnderstood(message, 'status');
  });

  stageMap.set(Stages.ASK_HELP, message => {
    const notWordCharacters = /\W|\d/g;
    const cleanedMessage = message.replace(notWordCharacters, ' ');

    let wordsList = cleanedMessage.split(' ');

    const positiveAnswer = t('chatbot.stages.user_status.positive_responses').split(',');

    const negativeAnswer = t('chatbot.stages.user_status.negative_responses').split(',');

    for (const word of wordsList) {
      if (positiveAnswer.includes(word)) {
        return actionProvider.handleMainHelp(true);
      } else if (negativeAnswer.includes(word)) {
        return actionProvider.handleMainHelp(false);
      }
    }

    return actionProvider.handleDontUnderstood(message, 'answer');
  });

  stageMap.set(Stages.MAIN_HELP, message => {
    if (
      message.includes(
        'chatbot.stages.main_help.possible_sections_requested.user_section'
      )
    ) {
      return actionProvider.userQuestions.handleUser();
    }

    const searchSectionWords = t(
      'chatbot.stages.main_help.possible_sections_requested.search_section'
    ).split(',');

    for (const word of searchSectionWords) {
      if (message.includes(word)) {
        return actionProvider.searchingQuestions.handleSearch();
      }
    }

    if (
      message.includes(
        '"chatbot.stages.main_help.possible_sections_requested.lists_section"'
      )
    ) {
      return actionProvider.listsQuestions.handleLists();
    }

    return actionProvider.handleDontUnderstood(message);
  });

  stageMap.set(Stages.USER_QUESTIONS, message => {
    if (message.includes('sign')) {
      return actionProvider.userQuestions.handleSignIn();
    }
    if (message.includes('log')) {
      return actionProvider.userQuestions.handleLogIn();
    }
    if (message.includes('info')) {
      return actionProvider.userQuestions.handleMyInfo();
    }
  });

  stageMap.set(Stages.SEARCHING_QUESTIONS, message => {
    if (message.includes('search')) {
      return actionProvider.searchingQuestions.handleHowToSearch();
    }
    if (message.includes('types')) {
      return actionProvider.searchingQuestions.handleResultTypes();
    }
    if (message.includes('database')) {
      return actionProvider.searchingQuestions.handleMovieDatabase();
    }
  });

  stageMap.set(Stages.LISTS_QUESTIONS, message => {
    if (message.includes('create')) {
      return actionProvider.listsQuestions.handleCreatingLists();
    }
    if (message.includes('add')) {
      return actionProvider.listsQuestions.handleAddingContent();
    }
    if (message.includes('remov')) {
      return actionProvider.listsQuestions.handleRemovingContent();
    }
    if (message.includes('types')) {
      return actionProvider.listsQuestions.handleResultTypes();
    }
    if (message.includes('database')) {
      return actionProvider.listsQuestions.handleMovieDatabase();
    }
  });

  return stageMap;
};

export default Stages;
