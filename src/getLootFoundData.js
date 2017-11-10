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
        f: 'getLootFoundData',
        vars: setup
      }
    })
    .then(request)
    .then(function (data) {
      if (!data.loot) throw new Error('no loot in response')
      var sample = +data.totalCaught
      var res = data.loot
        .map(function (loot) {
          var dropTimes = +loot.dropped
          var quantity = +loot.quant
          return {
            id: +loot.lid,
            name: loot.name,
            chance: dropTimes / sample,
            total: quantity,
            avgPerCatch: quantity / sample,
            avgPerDrop: quantity / dropTimes,
            sample: sample
          }
        })
        .sort(function (a, b) {
          return b.chance - a.chance
        })
      return res
    })
}

module.defaults = defaults
