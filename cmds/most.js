var ht = require('../')
var output = require('./options/output')
var vars = require('./options/vars')

exports.command = 'most <target>'
exports.describe = 'display most used setups'
exports.builder = function (yargs) {
  return yargs
    .options(output.options)
    .options(vars.options)
    .positional('target', {
      choices: [ 'location', 'mouse', 'trap', 'weapon', 'base', 'cheese', 'charm', 'trinket', 'title', 'rank',
        'shield', 'journal type', 'journal', 'season', 'hallway-length', 'hallway-tier', 'hallway-type',
        'grove-status', 'tide', 'iceberg-section' ],
      describe: 'dimension to split the results'
    })
    .option('min', {
      alias: 'm',
      default: 0,
      defaultDescription: '0 - include all',
      description: 'minimum hunts to include in results',
      type: 'number'
    })
}

exports.handler = function (argv) {
  vars.handler(argv)
  ht.getRecordCountsFromSetupsData(argv.vars, argv)
    .then(output.handler.bind(output, argv))
    .catch(console.error.bind(console))
}
