var Promise = require('bluebird')
var request = require('./rawRequest')
var data = require('./data')
var utils = require('./utils')
var htmenu = require('../cache/htmenu')

module.exports = function (type, name) {
  if (!type) throw new Error('missing type!')
  if (!name) throw new Error('missing name!')

  // if we are asked for id instead of name, just return it
  if (!Number.isNaN(+name)) return Promise.resolve({ id: +name })

  type = utils.prepareType(type)
  name = utils.prepareName(type, name)

  return Promise
    .try(function () {
      // first try with the short cache
      if (data.cached[ type ]) {
        if (name in data.cached[ type ]) {
          return { id: data.cached[ type ][ name ] }
        }
      }

      // then try with the htmenu cache
      for (var i = 0, l1 = htmenu.length; i < l1; i++) {
        var cacheType = utils.prepareType(htmenu[ i ].name)
        if (cacheType === type) {
          var items = htmenu[ i ].data
          for (var j = 0, l2 = items.length; j < l2; j++) {
            var cacheName = utils.prepareName(type, items[ j ].name)
            if (cacheName === name) {
              return Promise.resolve({ id: items[ j ].value })
            }
          }
          break
        }
      }

      console.error('Can\'t find cached id for ', type, '/', name, 'Trying to request from HT')

      // finally hope the api will work
      return request({
        f: 'getIdFromName',
        vars: {
          type: type,
          name: name
        }
      })
    })
    .then(function (body) {
      if (body && body.id) {
        body.id = +body.id
      }
      return body
    })
}
