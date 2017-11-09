var json2csv = require('json2csv')

exports.options = {
  o: {
    alias: 'output',
    choices: [ 'csv', 'json', 'pretty-json' ],
    default: 'pretty-json',
    desc: 'the format of output',
    global: true,
    string: true
  }
}

exports.handler = function (argv, output) {
  if (!output) throw new Error('need to provide output from command')
  switch (argv.output) {
    case 'json':
      console.log(JSON.stringify(output))
      break
    case 'pretty-json':
      console.log(JSON.stringify(output, null, 2))
      break
    case 'csv':
      console.log(json2csv({ data: [].concat(output) }))
      break
  }
}
