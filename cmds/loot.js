var ht = require('../')
var output = require('./options/output')
var vars = require('./options/vars')

exports.command = 'loot'
exports.describe = 'display loot drops for setup'
exports.builder = function (yargs) {
  return yargs
    .options(output.options)
    .options(vars.options)
}

exports.handler = function (argv) {
  vars.handler(argv)
  if (argv.verbose) console.log(argv)
  ht.getLootFoundData(argv.vars, argv)
    .then(output.handler.bind(output, argv))
    .catch(console.error.bind(console))
}
