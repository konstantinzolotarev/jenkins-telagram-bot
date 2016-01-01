'use strict';

const Hapi = require('hapi');
const config = require('config');
// Create a server with a host and port
const server = new Hapi.Server();
server.connection({
    host: config.hapi.host || 'localhost',
    port: config.hapi.port || 8000
});

const goodOptions = config.get('hapi.good');

server.register({
  register: require('good'),
  options: goodOptions
}, (err) => {

  if (err) {
    console.error(err);
  }
});

server.register({
  register: require('./hapi/index')
}, {
  routes: {
    prefix: '/api/v1'
  }
}, (err) => {

  if (err) {
    throw err;
  }
});

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});

module.exports = server;
