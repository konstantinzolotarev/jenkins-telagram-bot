'use strict';

const jenkinsapi = require('jenkins-api');
const config = require('config');
// API Token
const jenkins = jenkinsapi.init(config.jenkins.uri);

module.exports = jenkins;
