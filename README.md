# BTC-E API for Node.js

Simple API to BTC-E Crypto Coin Trading platform

Current version 0.4

## Features

  * Full API
  * Asynchronous requests
  * Automatically converts Date objects, strings and JS timestamps to UNIX timestamps

## Usage samples

### Init

```javascript
var BTCE = require('./btce.js')
var btce = new BTCE.api('YOUR-KEY', 'YOUR-SECRET')
```

### Get a ticker

```javascript
btce.ticker({ pair: 'btc_usd' }, function(err, data) {
  if (!err) {
    console.log(data)
  }
  else {
    console.log(err)
  }
})
```

### Display user information (funds, transaction count, open orders count...)

```javascript
btce.getInfo(function(err, data) {
  if (!err) {
    console.log(data)
  }
  else {
    console.log(err)
  }
})
```

### Get last 10 transactions in descending order

```javascript
btce.transHistory({ count: 10, order: 'DESC'}, function(err, data) {
  if (!err) {
    console.log(data)
  }
  else {
    console.log(err)
  }
})
```

### Custom queries

```javascript
btce.query('OrderList', { count: 5 }, function(err, data) {
  if (!err) {
    console.log(data)
  }
  else {
    console.log(err)
  }
})
```

## Methods

```javascript
// post (requires api key and secret)
getInfo = function(callback)
transHistory = function(params, callback)
tradeHistory = function(params, callback)
orderList = function(params, callback)
trade = function(params, callback)
cancelOrder = function(orderId, callback)
query = function(method, params, callback)

// get
fee = function(params, callback)
trades = function(params, callback)
depth = function(params, callback)
ticker = function(params, callback)

// utils
getTimestamp = function(time)
getHTTPS = function(url, callback)
```

Information about parameters in source comments

## BTC-E API documentation

https://btc-e.com/api/documentation

## Feature requests

  * petermrg at ymail dot com

## Donate

  * BTC: 1GVRSmJzZpFoLvFnPNtdwPeVXh6t4t65PZ
  * LTC: LWSRwTDKVxE9BGziUzbUw7MkHz6KACVnAA

