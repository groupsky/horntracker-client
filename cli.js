#!/usr/bin/env node

var ht = require('./')

process.title = 'ht-cli'

require('yargs')
  .command('id <type> <name>', 'get the id of item named "name"', function (yargs) {
    yargs
      .positional('type', {
        choices: [ 'loot', 'location', 'mouse', 'trap', 'base', 'cheese', 'charm', 'trinket', 'title', 'rank',
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
  .option('verbose', {
    alias: 'v',
    default: false
  })
  .argv
