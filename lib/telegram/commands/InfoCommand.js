'use strict';

const BotCommand = require('./BotCommand');
const jenkins = require('../../jenkins');
const _ = require('lodash');

module.exports = class InfoCommand extends BotCommand {

  get command() {
    return 'info';
  }

  get description() {
    return 'Get information about project `/jenkins info projectname`';
  }

  exec(args, msg, bot) {
    return new Promise((resolve, reject) => {
      if (!args || args.length === 0)
        return reject('Usage: `/jenkins info projectname`');

      const projName = _.trim(args.join(' '));
      jenkins.job_info(projName, function(err, data) {
        if (err) {
          bot.sendMessage(msg.chat.id, 'Jenkins response: FAIL');
          return reject(err);
        }

        const list = [
          data.name + ': \n',
          'URL: ' + data.url,
          'Could be build: ' + (data.buildable ? 'YES' : 'NO'),
          'Last build: ' + (data.lastBuild ? data.lastBuild.number : 'Unknown'),
          'Last Successful build: ' + (data.lastSuccessfulBuild ? data.lastSuccessfulBuild.number : 'Unknown'),
          'Last Unsuccessful build: ' + (data.lastUnsuccessfulBuild ? data.lastUnsuccessfulBuild.number : 'Unknown')
        ];
        bot.sendMessage(msg.chat.id, list.join('\n'));
        resolve();
      });
    });
  }
};
