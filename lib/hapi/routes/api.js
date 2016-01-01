'use strict';

const bot = require('../../telegram');
const _ = require('lodash');
const config = require('config');

module.exports = function(server, options) {

  server.route({
    method: ['GET', 'POST', 'PUT'],
    path: '/built',
    handler: function(request, reply) {
      if (!request.payload || !config.telegram.notifyChatId)
        return reply('ok');

      const data = request.payload;
      if (!data.name || data.build || data.build.phase !== 'FINALIZED')
        return reply('ok');

      const list = [
        data.name + ': Build number #' + data.build.number + '\n',
        'Build Status: ' + data.build.status,
        'Build URL: ' + data.build.full_url
      ];
      if (_.isObject(data.build.scm)) {
        list.push('GIT Commit #: ' + data.build.scm.commit || 'Unknown');
        list.push('GIT Branch: ' + data.build.scm.branch || 'Unknown');
        list.push('GIT URL: ' + data.build.scm.url || 'Unknown');
      }
      bot.sendMessage(config.telegram.notifyChatId, list.join('\n'));
      reply('ok');
    }
  });
};
