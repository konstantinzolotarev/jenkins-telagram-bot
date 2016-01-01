'use strict';

const BotCommand = require('./BotCommand');
const jenkins = require('../../jenkins');
const _ = require('lodash');

module.exports = class BuildCommand extends BotCommand {

  get command() {
    return 'build';
  }

  get description() {
    return 'Send a build command `/jenkins build projectname`';
  }

  exec(args, msg, bot) {
    return new Promise((resolve, reject) => {
      if (!args || args.length === 0)
        return reject('Usage: `/jenkins build projectname`');

      const projName = _.trim(args.join(' '));
      jenkins.build(projName, function(err, data) {
        if (err) {
          bot.sendMessage(msg.chat.id, 'Jenkins response: FAIL');
          return reject(err);
        }

        const list = [
          projName + ': Build process scheduled...'
        ];
        bot.sendMessage(msg.chat.id, list.join('\n'));
        resolve();
      });
    });
  }
};
