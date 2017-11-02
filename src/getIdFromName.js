var request = require('./rawRequest')
var data = require('./data')
var utils = require('./utils')

module.exports = function (type, name, cb) {
  if (!type) throw new Error('missing type!')
  if (!name) throw new Error('missing name!')

  type = utils.prepareType(type)
  name = utils.prepareName(type, name)

  return request({
    f: 'getIdFromName',
    vars: {
      type: type,
      name: name
    }
  }, function (e, r, body) {
    if (body === undefined && !e) {
      if (data.cached[type]) {
        if (name in data.cached[ type ]) {
          body = { id: data.cached[ type ][ name ] }
        }
      }
    }
    if (body && body.id) {
      body.id = +body.id
    }
    cb(e, r, body)
  })
}
