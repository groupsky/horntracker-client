#!/usr/bin/env node

var Promise = require('bluebird')
var ht = require('./')

var setupKeys = {
  mouse: 'mouse',
  weapon: [ 'trap', 'weapon' ]
}

process.title = 'ht-cli'

function coerceSetup (type, negate) {
  return function (values) {
    if (!values) return
    if (!Array.isArray(values)) values = [ values ]

    return Promise
      .map(values, function (value) {
        return ht.getIdFromName(type, value)
          .then(function (item) {
            if (!item) {
              return Promise.reject(new Error('unknown ' + type + ' "' + value + '"'))
            }
            return item
          })
      })
      .then(function (items) {
        var res = {}
        items.forEach(function (item) {
          res[ item.id ] = { exclude: negate }
        })
        return res
      })
  }
}

function extractSetup (argv) {
  return Promise.props(argv)
    .then(function (argv) {
      var setup = {}
      Object.keys(setupKeys).forEach(function (key) {
        var aliases = setupKeys[ key ]
        if (!Array.isArray(aliases)) aliases = [ aliases ]
        aliases.forEach(function (alias) {
          if (argv[ alias ]) {
            setup[ key ] = Object.assign(setup[ key ] || {}, argv[ alias ])
          }
          if (argv[ 'n' + alias ]) {
            setup[ key ] = Object.assign(setup[ key ] || {}, argv[ 'n' + alias ])
          }
        })
      })
      return setup
    })
}

/* eslint-disable no-unused-expressions */
require('yargs')
  .usage('Usage: $0 <command> [options]')
  .demandCommand(1)
  .command('id <type> <name>', 'get the id of item named "name"', function (yargs) {
    return yargs
      .positional('type', {
        choices: [ 'loot', 'location', 'mouse', 'trap', 'weapon', 'base', 'cheese', 'charm', 'trinket', 'title', 'rank',
          'shield', 'journal type', 'journal', 'season', 'hallway-length', 'hallway-tier', 'hallway-type',
          'grove-status', 'tide', 'iceberg-section' ],
        describe: 'type of item'
      })
      .positional('name', {
        describe: 'name of item'
      })
  }, function (argv) {
    if (argv.verbose) console.info('getting id of ' + argv.type + ' "' + argv.name + '"')
    ht.getIdFromName(argv.type, argv.name, function (e, r, body) {
      if (e) {
        console.error(e)
      } else {
        console.log(body)
      }
    })
  })
  .command('setup <target>', 'get the most used setups for specific query', function (yargs) {
    return yargs
      .positional('target', {
        choices: [ 'location', 'mouse', 'trap', 'weapon', 'base', 'cheese', 'charm', 'trinket', 'title', 'rank',
          'shield', 'journal type', 'journal', 'season', 'hallway-length', 'hallway-tier', 'hallway-type',
          'grove-status', 'tide', 'iceberg-section' ],
        describe: 'dimensions to split the results'
      })
      .option('mouse', {
        alias: 'm',
        coerce: coerceSetup('mouse', false),
        type: 'array'
      })
      .option('nmouse', {
        coerce: coerceSetup('mouse', true),
        type: 'array'
      })
  }, function (argv) {
    console.log(argv)
    var query = extractSetup(argv)
    ht.getRecordCountsFromSetupsData(argv.target, query).then(function (body) {
      console.log(body)
    }, function (e) {
      console.error(e)
    })
  })
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .argv
/* eslint-enable no-unused-expressions */
