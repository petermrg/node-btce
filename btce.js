/**
 * Node.js BTC-E Trading API
 * https://btc-e.com/api/documentation
 *
 * Version: 0.1
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

var BTCE = function(key, secret) {
  this.key = key
  this.secret = secret
  this.apiURL = 'https://btc-e.com:443/tapi'
  this.nonce = Math.floor(Date.now() / 1000)
}

BTCE.prototype.getInfo = function(callback) {
  this.query('getInfo', callback)
}

BTCE.prototype.query = function(method, callback) {
  this.nonce++

  var content = querystring.stringify({
    'method': method,
    'nonce': '' + this.nonce,
  })

  var sign = crypto
    .createHmac('sha512', new Buffer(this.secret, 'utf8'))
    .update(new Buffer(content, 'utf8'))
    .digest('hex')

  var options = url.parse(this.apiURL)
  options.method = 'POST'
  options.headers = {
    'Key': this.key,
    'Sign': sign,
    'content-type': 'application/x-www-form-urlencoded',
    'content-length': ''+content.length,
  }

  var req = https.request(options, function(res) {
    var data = ''
    res.setEncoding('utf8')
    res.on('data', function (chunk) {
      data+= chunk
    })
    res.on('end', function() {
      callback(false, data)
    })
  })

  req.on('error', function(err) {
    callback(err, null)
  })

  req.write(content)
  req.end()
}

exports.api = BTCE


