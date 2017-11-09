var data = require('./data')

exports.prepare = function (val) {
  val = val.trim().toLowerCase()
  return data.aliases[ val ] || val
}

exports.prepareType = function (type) {
  return exports.prepare(type)
}

exports.prepareName = function (type, name) {
  type = exports.prepare(type)
  name = exports.prepare(name)

  switch (type) {
    case 'weapon':
      if (!name.endsWith('trap')) name = name + ' trap'
      break
    case 'trinket':
      if (!name.endsWith('charm')) name = name + ' charm'
      break
    case 'base':
    case 'cheese':
    case 'mouse':
      if (!name.endsWith(type)) name = name + ' ' + type
      break
  }

  return name
}
