var Promise = require('bluebird')
var _ = require('lodash')
var debug = require('debug')('ht:loot')
var request = require('./rawRequest')
var vars = require('./vars')

var defaults = {}

module.exports = function (setup, opts) {
  if (!setup) throw new Error('missing setup!')
  opts = _.defaults(opts || {}, defaults)

  setup = vars(setup)

  return Promise
    .resolve(setup)
    .then(function (setup) {
      return {
        f: 'getTopTrapSetups',
        vars: setup
      }
    })
    .then(request.bind(request, opts))
    .then(function (data) {
      if (!data.toptraps) throw new Error('no toptraps in response')
      return data.toptraps
    })
}

module.defaults = defaults
