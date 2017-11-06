var test = require('tape')
var nock = require('nock')
var req = require('../src/getIdFromName')
var data = require('../src/data')

test('getIdFromName', function (t) {
  var nt = function (label, vars, res, type, name, cb) {
    return t.test(label, function (t) {
      nock(data.ENDPOINT).post('', { f: 'getIdFromName', vars: vars }).reply(200, res)
      req(type, name).then(function (d) { cb(t, null, null, d) }, function (e) { cb(t, e) })
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
    type: 'weapon',
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

  t.test('should use cached ht menu if down', function (t) {
    nock(data.ENDPOINT).post('', { f: 'getIdFromName', vars: { type: 'tide', name: 'high' } }).replyWithError(500)
    req('tide', 'high').then(function (d) {
      t.deepEqual(d, { id: 3 })
      t.end()
    }, function (e) {
      t.error(e, 'no error')
      t.fail()
      t.end()
    })
  })

  t.test('should report connectivity errors', function (t) {
    nock(data.ENDPOINT).post('', { f: 'getIdFromName', vars: { type: 'ala', name: 'bala' } }).replyWithError(500)
    req('ala', 'bala').then(function (d) {
      t.error(d)
      t.fail('no result')
      t.end()
    }, function (e) {
      t.ok(e, 'has error')
      t.end()
    })
  })
})
