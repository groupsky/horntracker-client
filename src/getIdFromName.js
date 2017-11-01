var request = require('./rawRequest')
var data = require('./data')

module.exports = function (type, name, cb) {
  if (!type) throw new Error('missing type!')
  if (!name) throw new Error('missing name!')

  type = type.trim().toLowerCase()
  name = name.trim().toLowerCase()

  if (data.aliases[ type ]) type = data.aliases[ type ]
  if (data.aliases[ name ]) name = data.aliases[ name ]
  switch (type) {
    case 'trap':
    case 'base':
    case 'cheese':
      if (!name.endsWith(type)) name = `${name} ${type}`
      break
    case 'trinket':
      if (!name.endsWith('charm')) name = `${name} charm`
      break
  }

  return request({
    f: 'getIdFromName',
    vars: {
      type: type,
      name: name,
    }
  }, function (e, r, body) {
    if (body === undefined && !e) {
      if (name in data.cached[ type ]) {
        body = { id: data.cached[ type ][ name ] }
      }
    }
    if (body && body.id) {
      body.id = +body.id
    }
    cb(e, r, body)
  })
}
