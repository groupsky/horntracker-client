var ht = require('../')
var output = require('./options/output')
var vars = require('./options/vars')

exports.command = 'top'
exports.describe = 'display top trap setups'
exports.builder = function (yargs) {
  return yargs
    .options(output.options)
    .options(vars.options)
}

exports.handler = function (argv) {
  vars.handler(argv)
  ht.getTopTrapSetups(argv.vars, argv)
    .then(output.handler.bind(output, argv))
    .catch(console.error.bind(console))
}
