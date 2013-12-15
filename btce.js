/**
 * Node.js BTC-E Trading API
 * https://btc-e.com/api/documentation
 *
 * Version: 0.4.2
 * Author : petermrg <petermrg@ymail.com>
 * gitHub : https://github.com/petermrg/node-btce
 *
 * Donate:
 * BTC: 1GVRSmJzZpFoLvFnPNtdwPeVXh6t4t65PZ
 * LTC: LWSRwTDKVxE9BGziUzbUw7MkHz6KACVnAA
 *
 * Want new features?, just ask me!
 */

var https = require('https')
var url = require('url')
var crypto = require('crypto')
var querystring = require('querystring')
var util = require('util')

module.exports = BTCE

function BTCE(key, secret) {
  this.key = key
  this.secret = secret
  this.urlPost = 'https://btc-e.com:443/tapi'
  this.urlGet = 'https://btc-e.com:443/api/2/'
  this.nonce = BTCE.getTimestamp(Date.now())
}

/**
 * getInfo: returns the information about the user's current balance, API key privileges,
 * the number of transactions, the number of open orders and the server time
 *
 * @param {Function} callback(err, data)
 */
BTCE.prototype.getInfo = function(callback) {
  this.query('getInfo', null, callback)
}

/**
 * transHistory: returns the transactions history.
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * parameter | oblig | description                                      | type      | default
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * from      | No    | the number of the order to start displaying with | numerical | 0
 * count     | No    | The number of orders for displaying              | numerical | 1000
 * from_id   | No    | id of the order to start displaying with         | numerical | 0
 * end_id    | No    | id of the order to finish displaying             | numerical | Infinity
 * order     | No    | sorting                                          | order[1]  | DESC
 * since     | No    | when to start displaying                         | time[2]   | 0
 * end       | No    | when to finish displaying                        | time[2]   | Infinity
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * [1] ASC or DESC
 * [2] Accepts UNIX timestamps, Date objects and strings like '2013-01-02 20:23'
 *
 * @param {Object} params
 * @param {Function} callback(err, data)
 */
BTCE.prototype.transHistory = function(params, callback) {
  this.query('TransHistory', params, callback)
}

/**
 * tradeHistory: returns the trade history.
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * parameter | oblig | description                                      | type      | default
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * from      | No    | the number of the order to start displaying with | numerical | 0
 * count     | No    | The number of orders for displaying              | numerical | 1000
 * from_id   | No    | id of the order to start displaying with         | numerical | 0
 * end_id    | No    | id of the order to finish displaying             | numerical | Infinity
 * order     | No    | sorting                                          | order[1]  | DESC
 * since     | No    | when to start displaying                         | time[2]   | 0
 * end       | No    | when to finish displaying                        | time[2]   | Infinity
 * pair      | No    | the pair to display the orders                   | pair[3]   | all pairs
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * [1] ASC or DESC
 * [2] Accepts UNIX timestamps, Date objects and strings like '2013-01-02 20:23'
 *
 * @param {Object} params
 * @param {Function} callback(err, data)
 */
BTCE.prototype.tradeHistory = function(params, callback) {
  this.query('TradeHistory', params, callback)
}

/**
 * orderList: returns your open orders/the orders history.
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * parameter | oblig | description                                      | type      | default
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * from      | No    | the number of the order to start displaying with | numerical | 0
 * count     | No    | The number of orders for displaying              | numerical | 1000
 * from_id   | No    | id of the order to start displaying with         | numerical | 0
 * end_id    | No    | id of the order to finish displaying             | numerical | Infinity
 * order     | No    | sorting                                          | order[1]  | DESC
 * since     | No    | when to start displaying                         | time[2]   | 0
 * end       | No    | when to finish displaying                        | time[2]   | Infinity
 * pair      | No    | the pair to display the orders                   | pair[3]   | all pairs
 * active    | No    | is it displaying of active orders only?          | 1 or 0    | 1
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * [1] ASC or DESC
 * [2] Accepts UNIX timestamps, Date objects and strings like '2013-01-02 20:23'
 * [3] Example: btc_usd
 *
 * @param {Object} params
 * @param {Function} callback(err, data)
 */
BTCE.prototype.orderList = function(params, callback) {
  this.query('OrderList', params, callback)
}

/**
 * ActiveOrders: returns your open orders/the orders history.
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * parameter | oblig | description                                      | type      | default
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * from      | No    | the number of the order to start displaying with | numerical | 0
 * count     | No    | The number of orders for displaying              | numerical | 1000
 * from_id   | No    | id of the order to start displaying with         | numerical | 0
 * end_id    | No    | id of the order to finish displaying             | numerical | Infinity
 * order     | No    | sorting                                          | order[1]  | DESC
 * since     | No    | when to start displaying                         | time[2]   | 0
 * end       | No    | when to finish displaying                        | time[2]   | Infinity
 * pair      | No    | the pair to display the orders                   | pair[3]   | all pairs
 * active    | No    | is it displaying of active orders only?          | 1 or 0    | 1
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * [1] ASC or DESC
 * [2] Accepts UNIX timestamps, Date objects and strings like '2013-01-02 20:23'
 * [3] Example: btc_usd
 *
 * @param {Object} params
 * @param {Function} callback(err, data)
 */
BTCE.prototype.activeOrders = function(params, callback) {
    this.query('ActiveOrders', params, callback)
}

/**
 * trade: Trading is done according to this method
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * parameter | oblig | description                                      | type      | default
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * pair      | Yes   | pair                                             | pair[1]   | -
 * type      | Yes   | the transaction type                             | trans[2]  | -
 * rate      | Yes   | the rate to by/sell                              | numerical | -
 * amount    | Yes   | the amount which is necessary to buy/sell        | numerical | -
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * [1] Example: btc_usd
 * [2] buy or sell
 *
 * @param {Object} params
 * @param {Function} callback(err, data)
 */
BTCE.prototype.trade = function(params, callback) {
  this.query('Trade', params, callback)
}

/**
 * cancelOrder: Cancellation of the order
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * parameter | oblig | description                                      | type      | default
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * order_id  | Yes   | Order id                                         | numerical | -
 * ----------+-------+--------------------------------------------------+-----------+-----------
 *
 * @param {Object} params
 * @param {Function} callback(err, data)
 */
BTCE.prototype.cancelOrder = function(orderId, callback) {
  this.query('CancelOrder', { 'order_id': orderId }, callback)
}

/**
 * query: Executes raw query to the API
 *
 * @param {String} method
 * @param {Object} params
 * @param {Function} callback(err, data)
 */
BTCE.prototype.query = function(method, params, callback) {
  var content = {
    'method': method,
    'nonce': ++this.nonce,
  }

  if (!!params && typeof(params) == 'object') {
    Object.keys(params).forEach(function (key) {
      if (key == 'since' || key == 'end') {
        value = BTCE.getTimestamp(params[key])
      }
      else {
        value = params[key]
      }
      content[key] = value
    })
  }

  content = querystring.stringify(content)

  var sign = crypto
    .createHmac('sha512', new Buffer(this.secret, 'utf8'))
    .update(new Buffer(content, 'utf8'))
    .digest('hex')

  var options = url.parse(this.urlPost)
  options.method = 'POST'
  options.headers = {
    'Key': this.key,
    'Sign': sign,
    'content-type': 'application/x-www-form-urlencoded',
    'content-length': content.length,
  }

  var req = https.request(options, function(res) {
    var data = ''
    res.setEncoding('utf8')
    res.on('data', function (chunk) {
      data+= chunk
    })
    res.on('end', function() {
      BTCE.responseHandler(null, data, callback)
    })
  })

  req.on('error', function(err) {
    BTCE.responseHandler(err, null, callback)
  })

  req.write(content)
  req.end()
}

/**
 * getHTTPS: Simple HTTPS GET request
 *
 * @param {String} getUrl
 * @param {Function} callback(err, data)
 */
BTCE.prototype.getHTTPS = function(getUrl, callback) {

  var options = url.parse(getUrl)
  options.method = 'GET'
  var req = https.request(options, function(res) {
    var data = ''
    var err = false;
    res.setEncoding('utf8')

    res.on('data', function (chunk) {
      data+= chunk
    })

    res.on('end', function() {
      BTCE.responseHandler(null, data, callback)
    })
  })

  req.on('error', function(err) {
    BTCE.responseHandler(err, null, callback)
  })

  req.end()
}

/**
 * trades: Gets a list of the last trades in BTC-E
 *
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * parameter | oblig | description                                      | type      | default
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * count     | No    | The number of orders for displaying              | numerical | 100
 * pair      | No    | the pair to display                              | pair[1]   | btc_usd
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * [1] Example: btc_usd
 *
 * @param {Object} params
 * @param {Function} callback(err, data)
 */
BTCE.prototype.trades = function(params, callback) {
  if (!params) params = {}
  if (!params.count) params.count = 100
  if (!params.pair) params.pair = 'btc_usd'

  var url = this.urlGet+params.pair+'/trades/'+params.count

  this.getHTTPS(url, callback)
}

/**
 * depth: get asks and bids
 *
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * parameter | oblig | description                                      | type      | default
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * count     | No    | The number of items for displaying               | numerical | 100
 * pair      | No    | the pair to display                              | pair[1]   | btc_usd
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * [1] Example: btc_usd
 *
 * @param {Object} params
 * @param {Function} callback(err, data)
 */
BTCE.prototype.depth = function(params, callback) {
  if (!params) params = {}
  if (!params.count) params.count = 100
  if (!params.pair) params.pair = 'btc_usd'

  var url = this.urlGet+params.pair+'/depth/'+params.count

  this.getHTTPS(url, callback)
}

/**
 * ticker: Get price and volume information
 *
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * parameter | oblig | description                                      | type      | default
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * pair      | No    | the pair to display                              | pair[1]   | btc_usd
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * [1] Example: btc_usd
 *
 * @param {Object} params
 * @param {Function} callback(err, data)
 */
BTCE.prototype.ticker = function(params, callback) {
  if (!params) params = {}
  if (!params.pair) params.pair = 'btc_usd'

  var url = this.urlGet+params.pair+'/ticker'

  this.getHTTPS(url, callback)
}

/**
 * fee: Get the fee for transactions
 *
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * parameter | oblig | description                                      | type      | default
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * pair      | No    | the pair to display                              | pair[1]   | btc_usd
 * ----------+-------+--------------------------------------------------+-----------+-----------
 * [1] Example: btc_usd
 *
 * @param {Object} params
 * @param {Function} callback(err, data)
 */
BTCE.prototype.fee = function(params, callback) {
  if (!params) params = {}
  if (!params.pair) params.pair = 'btc_usd'

  var url = this.urlGet+params.pair+'/fee'

  this.getHTTPS(url, callback)
}

/**
 * Helper function to handle BTCE HTTP responses and errors
 */
BTCE.responseHandler = function(err, data, callback) {
  if (err) {
    callback(err, null)
  } else {
    var result = null
    var errorMessage = null
    try {
      result = JSON.parse(data)
      if (result.error || result.success == 0) {
        errorMessage = result.error || 'Unknown error'
      }
    } catch (e) {
      errorMessage = 'Error parsing JSON'
    }
    if (errorMessage) {
      callback(new Error(errorMessage), result)
    } else {
      callback(null, result)
    }
  }
}

/**
 * getTimestamp: converts a Date object, a string, or a JS timestamp to a UNIX timestamp.
 *
 * @param {Mixed} time
 */
BTCE.getTimestamp = function(time) {
  if (util.isDate(time)) {
    return Math.round(time.getTime() / 1000)
  }
  if (typeof time == 'string') {
    return BTCE.getTimestamp(new Date(time))
  }
  if (typeof time == 'number') {
    return (time >= 0x100000000) ? Math.round(time / 1000) : time
  }
  return 0
}
