var BTCE = require('./btce.js')

var btce = new BTCE('YOUR-KEY', 'YOUR-SECRET')

btce.getInfo(function(err, data) {
  console.log('\nGet Info: ')
  if (!err) console.log(data)
  else console.log(err)
})

btce.ticker({ pair: 'btc_usd' }, function(err, data) {
  console.log('\nTicker: ')
  if (!err) console.log(data)
  else console.log(err)
})

