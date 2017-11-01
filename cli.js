#!/usr/bin/env node

var ht = require('./')

process.title = 'ht-cli'

require('yargs') // eslint-disable-line
  .command('id <type> <name>', 'get the id of item named "name"', (yargs) => {
    yargs
    .positional('type', {
      // choices: ['loot', 'location', 'mouse', 'trap', 'base', 'cheese', 'charm', 'trinket', 'title', 'rank', 'shield', 'journal type', 'journal', 'season', 'hallway-length', 'hallway-tier', 'hallway-type', 'grove-status'],
      describe: 'type of item',
    })
    .positional('name', {
      describe: 'name of item',
    })
  }, (argv) => {
  if (argv.verbose) console.info(`getting id of ${argv.type} '${argv.name}'`)
  ht.getIdFromName(argv.type, argv.name, (e, r, body) => {
      console.log(body)
    })
})
.option('verbose', {
  alias: 'v',
  default: false
})
  .argv
