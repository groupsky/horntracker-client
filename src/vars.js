var Promise = require('bluebird')
var _ = require('lodash')
var getIdFromName = require('./getIdFromName')
var debug = require('debug')('ht:vars')

module.exports = function (setup) {
  return Promise
    .resolve(setup)
    .then(function (setup) {
      debug('step 1', setup)
      return Promise.props(_.mapValues(setup, function (names, type) {
        debug('step 2', type, names)
        return Promise
          .resolve(type)
          .then(function (type) {
            debug('step 3', type)
            return Promise.all(_.map(names, function (values, name) {
              debug('step 4', name, values)
              return Promise
                .resolve(name)
                .then(getIdFromName.bind(null, type))
                .then(function (res) { return { name: name, id: res.id, values: values } })
            }))
            .then(function (items) {
              debug('step 5', items)
              return _.mapValues(_.keyBy(items, function (item) { return item.id }), function (item) {
                debug('step 6', item)
                // we don't convert the values
                if (_.isObjectLike(item.values)) {
                  return item.values
                }
                // the ht queries are negative so we need to negate our request
                return { exclude: !item.values }
              })
            })
          })
      }))
    })
}
