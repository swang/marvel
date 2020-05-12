'use strict'

var Resource = require('./lib/resource.js')

var Marvel

Marvel = function(opts = {}) {
  var defaults = {
    apiDomain: 'https://gateway.marvel.com'
  }
  var resOpt

  opts = { ...defaults, ...opts, API_VERSION: Marvel.API_VERSION }

  if (opts.privateKey === undefined || opts.publicKey === undefined) {
    throw new Error(
      'Unable to create a hash because of missing privateKey/publicKey'
    )
  }

  this.param = {}
  this.publicKey = opts.publicKey
  this.privateKey = opts.privateKey
  this.apiDomain = opts.apiDomain

  this.characters = new Resource('characters', opts)
  this.comics = new Resource('comics', opts)
  this.creators = new Resource('creators', opts)
  this.events = new Resource('events', opts)
  this.series = new Resource('series', opts)
  this.stories = new Resource('stories', opts)
}

Marvel.API_VERSION = 'v1'
Marvel.VERSION = require('./package').version

Marvel.prototype.keys = function(priv, pub) {
  this.privateKey = priv
  this.publicKey = pub
  return this
}

module.exports = Marvel
