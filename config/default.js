module.exports = {
  telegram: {
    token: "",
    notifyChatId: ""
  },

  jenkins: {
    uri: ""
  },

  hapi: {
    host: "localhost",
    port: 8000,

    good: {
      requestHeaders: true,
      requestPayload: true,
      responsePayload: true,
      responseEvent: 'response',
      reporters: [{
        reporter: require('good-console'),
        events: {
          log: '*',
          response: '*',
          error: '*',
          request: '*'
        }
      }]
    }
  }
}
