'use strict';
const _ = require('lodash');
const BotCommand = require('./BotCommand.js');
const PingCommand = require('./PingCommand.js');
const ListCommand = require('./ListCommand.js');
const InfoCommand = require('./InfoCommand.js');
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
          list.push('/jenkins '+ key + ": " + command.description);
      });
      bot.sendMessage(msg.chat.id, list.join('\n'));
      resolve();
    });
  }
};

const tmp = [
  new PingCommand(),
  new ListCommand(),
  new InfoCommand()
];

const commands = {};
_.forEach(tmp, (cmd) => {
  commands[cmd.command] = cmd;
});

commands.help = new HelpCommand();

module.exports = commands;
