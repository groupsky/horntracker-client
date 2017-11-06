var Promise = require('bluebird')
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
    case 'base':
    case 'cheese':
      if (!name.endsWith(type)) name = name + ' ' + type
      break
    case 'trinket':
      if (!name.endsWith('charm')) name = name + ' charm'
      break
  }

  return name
}

exports.prepareSetup = function (setup) {
  return Promise.resolve(setup).then(function (setup) {
    console.log(setup)
    return setup
  })
}
