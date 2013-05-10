var BTCE = require('./btce.js')

var btce = new BTCE.api('YOUR-KEY', 'YOUR-SECRET')

btce.getInfo(function(err, data) {
  if (!err) {
    console.log(JSON.parse(data))
  }
  else {
    console.log(err)
  }
})
