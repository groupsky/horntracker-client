var ht = require('../')
var output = require('./options/output')
var vars = require('./options/vars')

exports.command = 'loot'
exports.describe = 'display loot drops for setup'
exports.builder = function (yargs) {
  return yargs
    .options(output.options)
    .options(vars.options)
    .option('min-chance', {
      coalesce: function (val) { return val / 100 },
      default: 0,
      defaultDescription: '(0%)',
      description: 'Minimum chance to include loot in results',
      number: true,
      requiresArg: true
    })
    .option('min-qty', {
      default: 0,
      description: 'Minimum average quantity per catch to include loot in results',
      number: true,
      requiresArg: true
    })
}

exports.handler = function (argv) {
  vars.handler(argv)
  if (argv.verbose) console.log(argv)
  ht.getLootFoundData(argv.vars, argv)
    .then(output.handler.bind(output, argv))
    .catch(console.error.bind(console))
}
