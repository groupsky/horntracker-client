var rp = require('request-promise')
var data = require('./data')
// require('request-debug')(rp)

module.exports = function (req) {
  return rp({
    method: 'POST',
    url: data.ENDPOINT,
    json: true,
    body: req
  })
}
