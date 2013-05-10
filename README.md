# BTC-E API for Node.js

Simple API to BTC-E Crypto Coin Trading platform

Current version 0.3

## Features

  * Full API
  * Asynchronous requests
  * Automatically converts Date objects, strings and JS timestamps to UNIX timestamps

## Usage samples

### Init

    var BTCE = require('./btce.js')
    var btce = new BTCE.api('YOUR-KEY', 'YOUR-SECRET')


### Display user information (funds, transaction count, open orders count...)

    btce.getInfo(function(err, data) {
      if (!err) {
        console.log(data)
      }
      else {
        console.log(err)
      }
    })

### Get last 10 transactions in descending order

    btce.transHistory({ count: 10, order: 'DESC'}, function(err, data) {
      if (!err) {
        console.log(data)
      }
      else {
        console.log(err)
      }
    })

### Custom queries

    btce.query('OrderList', { count: 5 }, function(err, data) {
      if (!err) {
        console.log(data)
      }
      else {
        console.log(err)
      }
    })


## Methods

    ```javascript
    getInfo = function(callback)
    transHistory = function(params, callback)
    tradeHistory = function(params, callback)
    orderList = function(params, callback)
    trade = function(params, callback)
    cancelOrder = function(orderId, callback)
    query = function(method, params, callback)
    getTimestamp = function(time)
    ```

Information about parameters in source comments

## BTC-E API documentation

https://btc-e.com/api/documentation

## Feature requests

  * petermrg at ymail dot com

## Donate

  * BTC: 1GVRSmJzZpFoLvFnPNtdwPeVXh6t4t65PZ
  * LTC: LWSRwTDKVxE9BGziUzbUw7MkHz6KACVnAA

