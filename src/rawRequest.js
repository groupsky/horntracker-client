var request = require('request')
var data = require('./data')

module.exports = function (req, cb) {
  return request({
    method: 'POST',
    url: data.ENDPOINT,
    json: true,
    body: req
  }, cb)
}
