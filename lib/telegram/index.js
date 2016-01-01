'use strict';

const TelegramBot = require('node-telegram-bot-api');
const config = require('config');

// Setup polling way
const bot = new TelegramBot(config.telegram.token, {polling: true});

module.exports = bot;
