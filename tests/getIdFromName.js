var test = require('tape')
var nock = require('nock')
var req = require('../src/getIdFromName')
var data = require('../src/data')

test('getIdFromName', function (t) {
  var nt = function (label, vars, res, type, name, cb) {
    return t.test(label, function (t) {
      nock(data.ENDPOINT).post('', { f: 'getIdFromName', vars: vars }).reply(200, res)
      req(type, name, cb.bind(null, t))
    })
  }

  nt('should handle unknown types', {
    type: 'undefined',
    name: 'undefined'
  }, undefined, 'undefined', 'undefined', function (t, e, r, d) {
    t.error(e, 'no error')
    t.equals(d, undefined)
    t.end()
  })

  nt('request type/name', {
    type: 'trap',
    name: 'ambush trap'
  }, { id: 1 }, 'trap', 'ambush', function (t, e, r, data) {
    t.error(e, 'no error')
    t.ok(data, 'has data')
    t.deepEqual(data, { id: 1 }, 'ambush trap is resolved')
    t.end()
  })

  nt('request unknown type', {
    type: 'traps',
    name: 'ambush trap'
  }, undefined, 'traps', 'ambush trap', function (t, e, r, data) {
    t.error(e, 'no error')
    t.equal(data, undefined)
    t.end()
  })

  nt('request unknown item', {
    type: 'loot',
    name: 'unknown'
  }, undefined, 'loot', 'unknown', function (t, e, r, data) {
    t.error(e, 'no error')
    t.equal(data, undefined)
    t.end()
  })

  nt('should provide cached response when missing from api', {
    type: 'tide',
    name: 'high'
  }, undefined, 'tide', 'high', function (t, e, r, res) {
    t.error(e, 'no error')
    t.ok(res)
    t.deepEqual(res, { id: data.cached.tide.high })
    t.end()
  })

  t.test('should report connectivity errors', function (t) {
    nock(data.ENDPOINT).post('', { f: 'getIdFromName', vars: {type: 'tide', name: 'high'} }).replyWithError(500)
    req('tide', 'high', function (e, r, res) {
      t.ok(e, 'has error')
      t.error(res, 'no result')
      t.end()
    })
  })
})
