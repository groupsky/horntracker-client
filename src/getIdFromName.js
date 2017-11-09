var Promise = require('bluebird')
var request = require('./rawRequest')
var data = require('./data')
var utils = require('./utils')

module.exports = function (type, name) {
  if (!type) throw new Error('missing type!')
  if (!name) throw new Error('missing name!')

  // if we are asked for id instead of name, just return it
  if (!Number.isNaN(+name)) return Promise.resolve({ id: +name })

  type = utils.prepareType(type)
  name = utils.prepareName(type, name)

  return request({
    f: 'getIdFromName',
    vars: {
      type: type,
      name: name
    }
  })
    .catch(function (err) {
      if (!err || !err.statusCode === 500) return Promise.reject(err)
      var htmenu = require('../cache/htmenu')
      for (var i = 0, l1 = htmenu.length; i < l1; i++) {
        var cacheType = utils.prepareType(htmenu[ i ].name)
        if (cacheType === type) {
          var items = htmenu[ i ].data
          for (var j = 0, l2 = items.length; j < l2; j++) {
            var cacheName = utils.prepareName(type, items[ j ].name)
            if (cacheName === name) {
              console.log('found cached')
              return Promise.resolve({ id: items[ j ].value })
            }
          }
          break
        }
      }
      console.error('Can\'t find cached id for ', type, '/', name)
      return Promise.reject(err)
    })
    .then(function (body) {
      if (body === undefined) {
        if (data.cached[ type ]) {
          if (name in data.cached[ type ]) {
            body = { id: data.cached[ type ][ name ] }
          }
        }
      }
      if (body && body.id) {
        body.id = +body.id
      }
      return body
    })
}
