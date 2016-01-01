'use strict';

module.exports = function(server, options) {

  server.route({
    method: ['GET', 'POST', 'PUT'],
    path: '/built',
    handler: function(request, reply) {
      console.log(request.payload);
      reply('ok');
    }
  });
};
