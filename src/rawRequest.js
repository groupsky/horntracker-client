var Promise = require('bluebird')
var rp = require('request-promise')
var data = require('./data')
// require('request-debug')(rp)

module.exports = function (opts, req) {
  if (!req) {
    req = opts
    opts = {}
  }
  var promise = rp({
    method: 'POST',
    url: data.ENDPOINT,
    json: true,
    body: req
  })
  if (opts.retry) {
    promise = promise
      .catch(function (err) { // eslint-disable-line handle-callback-err
        console.error('ht error, retrying...')
        return Promise.delay(30000).then(module.exports.bind(module, opts, req))
      })
  }
  return promise
}
