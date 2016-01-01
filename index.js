'use strict';

const config = require('config');
const _ = require('lodash');
const telegramBot = require('./lib/telegram');
const telegramUtils = require('./lib/telegram/utils');
const botCommands = require('./lib/telegram/commands');

if (_.isObject(config.hapi)) {
  const hapiServer = require('./lib/hapi');
}

telegramBot.getMe().then((user) => {
  const congrats = '* Hey hey.... Bot: ' + user.first_name + 'hello you...  *';
  console.log(Array(congrats.length + 1).join('*'));
  console.log(congrats);
  console.log('* I am available on username: @' + user.username + '  *');
  console.log(Array(congrats.length + 1).join('*'));
});

// Bot initialization
telegramBot.onText(/\/jenkins (.+)/, function (msg, match) {
  if (!match || !match[1])
    return telegramBot.sendMessage(msg.chat.id, 'Yes yes I am alive');

  const result = telegramUtils.parseCommand(match[1]);
  telegramUtils
    .invoke(result.command, result.args, msg, telegramBot)
    .then()
    .catch((err) => {
      throw err;
    });
});
