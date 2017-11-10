var ht = require('../')
var output = require('./options/output')
var vars = require('./options/vars')

exports.command = 'pop'
exports.aliases = 'population'
exports.describe = 'display mouse population for setup'
exports.builder = function (yargs) {
  return yargs
    .options(output.options)
    .options(vars.options)
    .option('c', {
      alias: 'confidence',
      coerce: function (val) { return val / 100 },
      default: 0,
      defaultDescription: '(0%) - all results will be included',
      description: 'minimum confidence to include mouse in the population data',
      number: true,
      requiresArg: true
    })
    .option('a', {
      alias: 'attraction',
      coerce: function (val) { return val / 100 },
      default: 0,
      defaultDescription: '(0%) - all results will be included',
      description: 'minimum attraction to include mouse in the population data',
      number: true,
      requiresArg: true
    })
}

exports.handler = function (argv) {
  vars.handler(argv)
  if (argv.verbose) console.log(argv)
  ht.getSAEncounterRateData(argv.vars, argv)
    .then(output.handler.bind(output, argv))
    .catch(console.error.bind(console))
}
