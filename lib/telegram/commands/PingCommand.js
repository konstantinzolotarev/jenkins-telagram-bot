'use strict';

const BotCommand = require('./BotCommand');
const jenkins = require('../../jenkins');

module.exports = class PingCommand extends BotCommand {

  get command() {
    return 'ping';
  }

  get description() {
    return 'Ping a Jenkins server.';
  }

  exec(args, msg, bot) {
    return new Promise((resolve, reject) => {
      jenkins.all_jobs(function(err, data) {
        if (err) {
          bot.sendMessage(msg.chat.id, 'Jenkins response: FAIL');
          return reject(err);
        }

        bot.sendMessage(msg.chat.id, 'Jenkins response: OK');
        resolve();
      });
    });
  }
};
