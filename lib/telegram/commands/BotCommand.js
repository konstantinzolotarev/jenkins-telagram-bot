'use strict';

module.exports = class BotCommand {

  constructor () {
  }

  get command() {
    return '';
  }

  get description() {
    return '';
  }

  exec(args, msg, bot) {
    return Promise.resolve(true);
  }
};
