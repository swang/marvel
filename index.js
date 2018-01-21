'use strict';

var Resource = require('./lib/resource.js')

var Marvel, merge, hasProp

hasProp = function(o, p) {
  return Object.prototype.hasOwnProperty.call(o, p)
}

// merge
merge = function(a, b) {
  var k

  for (k in a) {
    if (hasProp(a, k) && hasProp(b, k) === false) {
      b[k] = a[k]
    }
  }
  return b
}

Marvel = function(opts) {
  var defaults = {
    apiDomain: 'https://gateway.marvel.com',
    gzip: true
  }
  var resOpt

  opts = merge(defaults, opts || {})

  if (opts.privateKey === undefined || opts.publicKey === undefined) {
    throw new Error('Unable to create a hash because of missing privateKey/publicKey')
  }

  this.param = {}
  this.publicKey = opts.publicKey
  this.privateKey = opts.privateKey
  this.apiDomain = opts.apiDomain
  this.gzip = opts.gzip

  resOpt = merge(opts, { API_VERSION: Marvel.API_VERSION })

  this.characters = new Resource('characters', resOpt)
  this.comics = new Resource('comics', resOpt)
  this.creators = new Resource('creators', resOpt)
  this.events = new Resource('events', resOpt)
  this.series = new Resource('series', resOpt)
  this.stories = new Resource('stories', resOpt)

}

Marvel.API_VERSION = 'v1'
Marvel.VERSION = require('./package').version

Marvel.prototype.keys = function(priv, pub) {
  this.privateKey = priv
  this.publicKey = pub
  return this
}

module.exports = Marvel
