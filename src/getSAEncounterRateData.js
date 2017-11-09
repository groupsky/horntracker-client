var Promise = require('bluebird')
var _ = require('lodash')
var debug = require('debug')('ht:pop')
var request = require('./rawRequest')
var vars = require('./vars')

var defaults = {
  attraction: 0,
  confidence: 0
}

module.exports = function (setup, opts) {
  if (!setup) throw new Error('missing setup!')
  opts = _.defaults(opts || {}, defaults)

  setup = vars(setup)

  return Promise
    .resolve(setup)
    .then(function (setup) {
      return {
        f: 'getSAEncounterRateData',
        vars: setup
      }
    })
    .then(request)
    .then(function (data) {
      if (!data.mice) throw new Error('no mice in response')
      var sample = +data.huntCount
      var total = 0
      var filtered = 0
      var filteredSeen = 0
      var res = data.mice
        .map(function (mice) {
          var seen = +mice.seen
          var ar = seen / sample
          var error = +mice.sError
          return {
            mouse: mice.name.replace(/ Mouse$/, ''),
            attraction: ar,
            seen: seen,
            error: error / ar,
            sample: sample
          }
        })
        .filter(function (mice) {
          var filter = false
          if (opts.confidence > 0 && mice.error > 1 / opts.confidence) filter = true
          if (opts.attraction > 0 && mice.seen / sample < opts.attraction) filter = true
          if (filter) {
            filtered++
            filteredSeen += mice.seen
            return false
          }
          total += +mice.seen
          return true
        })
        .map(function (mice) {
          // correct attraction due to filtering
          mice.attraction = mice.seen / total
          return mice
        })
        .sort(function (a, b) {
          return b.attraction - a.attraction
        })
      debug('filtered %d mice with total pop %d%%', filtered, Math.round(filteredSeen / sample * 10000) / 100)
      return res
    })
}

module.defaults = defaults
