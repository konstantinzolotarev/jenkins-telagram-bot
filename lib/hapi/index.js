'use strict';

exports.register = function (server, options, next) {
  require('./routes/api')(server, options);
  next();
};

exports.register.attributes = {
  name: 'api-v1',
  version: '1.0.0'
};
