'use strict';

const commands = require('./commands');
const _ = require('lodash');

module.exports = {

  /**
   * Get command and list of argumants from given string
   * @param  {string} commandStr
   * @return {object}
   */
  parseCommand: function(commandStr) {
    const res = commandStr.split(' ');
    return {
      command: res[0],
      args: res.length > 1 ? _.drop(res, 1) : []
    };
  },

  /**
   * Get list of available commands
   * @return {Array}
   */
  getCommands: function() {
    return _.keys(commands);
  },

  /**
   * Get a command for Telegram Bot
   * @param {string} command
   * @return {Promise}
   */
  getCommand: function(command) {
    return new Promise((resolve, reject) => {
      if (!commands[command])
        return reject('No command found: /' + command);

      return resolve(commands[command]);
    });
  },

  invoke: function(command, args, msg, bot) {
    return this
      .getCommand(command)
      .then((cmd) => {
        return cmd
          .exec(args, msg, bot);
      })
      .catch((err) => {
        if (_.isString(err))
          bot.sendMessage(msg.chat.id, err);
        if (err.message)
          bot.sendMessage(msg.chat.id, err.message);
      });
  }
};
