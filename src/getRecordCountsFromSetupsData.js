var Promise = require('bluebird')
var _ = require('lodash')
var debug = require('debug')('ht:pop')
var request = require('./rawRequest')
var utils = require('./utils')
var vars = require('./vars')

var aliases = {
  trap: 'weapon',
  trinket: 'charm'
}

var defaults = {
  min: 0,
  target: 'weapon'
}

module.exports = function (setup, opts) {
  if (!setup) throw new Error('missing setup!')
  opts = _.defaults(opts || {}, defaults)

  setup = vars(setup)

  var target = utils.prepareType(opts.target)
  if (target in aliases) target = aliases[ target ]

  return Promise
    .resolve(setup)
    .then(function (setup) {
      return {
        f: 'getRecordCountsFromSetupsData',
        vars: setup,
        target: {
          name: target,
          min: opts.min
        }
      }
    })
    .then(request.bind(request, opts))
    .then(function (res) { return res.targets })
}

module.defaults = defaults
