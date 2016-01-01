'use strict';

module.exports = function(server, options) {

  server.route({
    path: '/built',
    handler: function(request, reply) {
      console.log(request.payload);
      reply('ok');
    }
  });
};
