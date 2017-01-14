# BTC-E API for Node.js

Simple API to BTC-E Crypto Coin Trading platform

## Features

  * Full API (Public and Trade)
  * Asynchronous requests
  * Automatically converts Date objects, strings and JS timestamps to UNIX timestamps

## Usage samples

### Install

```
npm install btce
```

### Init

```javascript
var BTCE = require('btce')
var btce = new BTCE('YOUR-KEY', 'YOUR-SECRET')
```

### Get a ticker

```javascript
btce.ticker({ pair: 'btc_usd' }, function(err, data) {
  if (!err) console.log(data)
  else console.log(err)
})
```

### Display user information (funds, transaction count, open orders count...)

```javascript
btce.getInfo(function(err, data) {
  if (!err) console.log(data)
  else console.log(err)
})
```

### Get last 10 transactions in descending order

```javascript
btce.transHistory({ count: 10, order: 'DESC' }, function(err, data) {
  if (!err) console.log(data)
  else console.log(err)
})
```

### Buy 2 bitcoins for 100$ each

```javascript
btce.trade({'pair': 'btc_usd', 'type': 'buy', 'rate': 100.0, 'amount': 2.0}, function(err, data) {
  if (!err) console.log(data);
  else console.log(err);
});
```

## Methods

```javascript
// Trade API (requires api key and secret)
getInfo(callback)
transHistory(params, callback)
tradeHistory(params, callback)
orderList(params, callback)
activeOrders(params, callback)
trade(params, callback)
cancelOrder(orderId, callback)
query(method, params, callback)

// Public API
fee(params, callback)
trades(params, callback)
depth(params, callback)
ticker(params, callback)

// utils
getTimestamp(time)
getHTTPS(url, callback)
```

Information about parameters in source comments

## BTC-E API documentation

  * Trade: https://btc-e.com/api/documentation
  * Public: https://btc-e.com/page/2
