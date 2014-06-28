'use strict';

var resolve = require('path').resolve;


module.exports = {
  echoStdin: resolve(__dirname, 'commands/echoStdin.js'),
  ignoreStdin: resolve(__dirname, 'commands/ignoreStdin.js')
};
