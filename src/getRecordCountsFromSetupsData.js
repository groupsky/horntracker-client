var Promise = require('bluebird')
var request = require('./rawRequest')
var utils = require('./utils')

var aliases = {
  trap: 'weapon',
  trinket: 'charm'
}

module.exports = function (target, setup) {
  if (!target) throw new Error('missing target!')
  if (!setup) throw new Error('missing setup!')

  setup = utils.prepareSetup(setup)

  target = utils.prepareType(target)
  if (target in aliases) target = aliases[ target ]

  return Promise
    .resolve(setup)
    .then(function (setup) {
      return {
        f: 'getRecordCountsFromSetupsData',
        vars: setup,
        target: {
          name: target
        }
      }
    })
    .then(request)
}
