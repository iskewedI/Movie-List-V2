import { stageManager } from './Stages';

const getMessageParser = t =>
  class MessageParser {
    constructor(actionProvider, state) {
      this.actionProvider = actionProvider;
      this.state = state;
      this.stageManager = stageManager(this.actionProvider, t);
    }

    parse(message) {
      if (message === '') return;

      const { stage } = this.state;

      const lowerCaseMessage = message.toLowerCase();

      const handler = this.stageManager.get(stage);
      if (handler) {
        return handler(lowerCaseMessage);
      }

      return this.actionProvider.handleDontUnderstood('answer', message);
    }
  };

export default getMessageParser;
