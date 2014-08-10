'use strict';

// merge
var merge = function(a, b) {
  var k
  for (k in a) {
    if (a.hasOwnProperty(k) && b.hasOwnProperty(k) === false) {
      b[k] = a[k]
    }
  }
  return b
}

var responseFn = function(callback) {
  return function (err, resp, body) {
    if (err) { return callback(err) }
    if (resp.statusCode > 400 && resp.statusCode < 500) {
      return callback(JSON.parse(body))
    }
    return callback(err, JSON.parse(body))
  }
}


var Marvel = function(opts) {
  var defaults = {
    apiDomain: "https://gateway.marvel.com"
  , gzip: true
  }

  opts = merge(defaults, opts || {})

  if (opts.privateKey === undefined || opts.publicKey === undefined) {
    throw new Error('Unable to create a hash because of missing privateKey/publicKey')
  }

  this.param = {}
  this.publicKey = opts.publicKey
  this.privateKey = opts.privateKey
  this.apiDomain = opts.apiDomain
  this.gzip = opts.gzip

  this.characters = new Resource('characters', opts)
  console.log(Object.keys(this.characters))

}

Marvel.API_VERSION = "v1"
Marvel.VERSION = require('./package').version


Marvel.prototype.keys = function(priv, pub) {
  this.privateKey = priv
  this.publicKey = pub
}

module.exports = Marvel
