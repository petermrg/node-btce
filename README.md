# BTC-E API for Node.js

Simple API to BTC-E Crypto Coin Trading platform

## Usage

Init

    var BTCE = require('./btce.js')
    var btce = new BTCE.api('YOUR-KEY', 'YOUR-SECRET')


Display user information (funds, transaction count, open orders count...)

    btce.getInfo(function(err, data) {
      if (!err) {
        console.log(JSON.parse(data))
      }
      else {
        console.log(err)
      }
    })

Get last 10 transactions in descending order

    btce.transHistory({ count: 10, order: 'DESC'}, function(err, data) {
      if (!err) {
        console.log(JSON.parse(data))
      }
      else {
        console.log(err)
      }
    })

Custom queries

    btce.query('OrderList', { count: 5 }, function(err, data) {
      if (!err) {
        console.log(JSON.parse(data))
      }
      else {
        console.log(err)
      }
    })


## BTC-E API documentation

https://btc-e.com/api/documentation

## Feature requests

  * petermrg at ymail dot com
