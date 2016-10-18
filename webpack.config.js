const server = require('./webpack.conf.d/server.config.js');
const serverBundle = require('./webpack.conf.d/server-bundle.config.js');
const clientBundle = require('./webpack.conf.d/client-bundle.config.js');

module.exports = [
  server,
  serverBundle,
  clientBundle
];
