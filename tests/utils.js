var test = require('tape')
var utils = require('../src/utils')

test('alias replacement', function (t) {
  t.equal(utils.prepare('charm'), 'trinket', 'should change charm to trinket')
  t.end()
})

test('charm suffix', function (t) {
  t.equal(utils.prepareName('trinket', 'cookie charm'), 'cookie charm', 'should not append charm suffix if exists')
  t.equal(utils.prepareName('trinket', 'cookie'), 'cookie charm', 'should append charm suffix if missing')
  t.end()
})

test('trap suffix', function (t) {
  t.equal(utils.prepareName('trap', 'ambush trap'), 'ambush trap', 'should not append trap suffix if exists')
  t.equal(utils.prepareName('trap', 'ambush'), 'ambush trap', 'should append trap suffix if missing')
  t.end()
})

test('cheese suffix', function (t) {
  t.equal(utils.prepareName('cheese', 'brie cheese'), 'brie cheese', 'should not append cheese suffix if exists')
  t.equal(utils.prepareName('cheese', 'brie'), 'brie cheese', 'should append cheese suffix if missing')
  t.end()
})
