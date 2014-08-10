'use strict';
var Resource = require('./lib/resource.js')

var Marvel, responseFn, merge

// merge
merge = function(a, b) {
  var k
  for (k in a) {
    if (a.hasOwnProperty(k) && b.hasOwnProperty(k) === false) {
      b[k] = a[k]
    }
  }
  return b
}

Marvel.API_VERSION = "v1"
Marvel.VERSION = require('./package').version

Marvel = function(opts) {
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

  this.characters = new Resource('characters', merge(opts, { API_VERSION: Marvel.API_VERSION })

}

Marvel.prototype.keys = function(priv, pub) {
  this.privateKey = priv
  this.publicKey = pub
}

module.exports = Marvel
