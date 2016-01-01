'use strict';
const _ = require('lodash');
const BotCommand = require('./BotCommand.js');
const PingCommand = require('./PingCommand.js');
const HelpCommand = class HelpCommand extends BotCommand {

  get command() {
    return 'help';
  }

  get description() {
    return 'help';
  }

  exec (args, msg, bot) {
    return new Promise((resolve, reject) => {
      const list = []
      _.forEach(commands, function(command, key) {
          list.push('/'+ key + ": " + command.description);
      });
      bot.sendMessage(msg.chat.id, list.join('\n'));
      resolve();
    });
  }
};

const ping = new PingCommand();

const commands = {};
commands[ping.command] = ping;

commands.help = new HelpCommand();

module.exports = commands;
