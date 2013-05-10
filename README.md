# BTC-E API for Node.js

Simple API interface for the Crypto Coin Trading platform BTC-E

## Usage

Sample:

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

## Feature requests:

  * petermrg at ymail dot com
