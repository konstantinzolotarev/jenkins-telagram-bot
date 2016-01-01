'use strict';

const BotCommand = require('./BotCommand');
const jenkins = require('../../jenkins');
const _ = require('lodash');

module.exports = class ListCommand extends BotCommand {

  get command() {
    return 'list';
  }

  get description() {
    return 'Get list of projects from server';
  }

  exec(args, msg, bot) {
    return new Promise((resolve, reject) => {
      jenkins.all_jobs(function(err, data) {
        if (err) {
          bot.sendMessage(msg.chat.id, 'Jenkins response: FAIL');
          return reject(err);
        }

        const list = [
          'Here are list of your projects: \n'
        ];
        _.forEach(data, (project) => {
          list.push('- ' + project.name);
        });
        bot.sendMessage(msg.chat.id, list.join('\n'));
        resolve();
      });
    });
  }
};
