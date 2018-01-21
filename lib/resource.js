'use strict';

var request = require('request')
var crypto = require('crypto')
var plural = require('plural').addRule(/series/i, function(w) { return w })
var fields = require('./resource_fields')

var Resource, responseFn, resources, res, fn, lower, merge, hasProp

// lowercase helper
lower = function(s) {
  return s.toLowerCase()
}

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

responseFn = function(callback) {
  return function(err, resp, body) {
    var pBody

    if (err) { return callback(err) }
    if (resp.statusCode > 400 && resp.statusCode < 500) {
      return callback(JSON.parse(body))
    }
    pBody = JSON.parse(body)
    return callback(err, pBody.data.results, pBody)
  }
}

Resource = function(resource, opts) {
  var resourceCalls = fields[resource]

  this.resource = resource
  this.param = Object.create(null)
  this.apiDomain = opts.apiDomain
  this.publicKey = opts.publicKey
  this.privateKey = opts.privateKey
  this.API_VERSION = opts.API_VERSION
  this.gzip = opts.gzip

  for (var h = 0; h < resourceCalls.length; h++) {
    res = resourceCalls[h]

    this[res] = (function(k) {
      return function (val) {
        this.param[k] = val
        return this
      }
    }(res))
  }
}

Resource.prototype.hash = function(ts) {
  return crypto.createHash('md5').update(String(ts) + this.privateKey + this.publicKey).digest('hex')
}

Resource.prototype.get = function(cb) {
  var uri
  var qs
  var req
  var ts = +new Date()

  uri = this.apiDomain + '/' + this.API_VERSION + '/public/' + lower(this.resource)

  qs = merge({
    apikey: this.publicKey,
    ts: ts,
    hash: this.hash(ts)
  }, this.param)

  req = {
    uri: uri,
    qs: qs,
    strictSSL: false,
    gzip: this.gzip
  }

  request(req, responseFn(cb))

  this.param = {}

}

Resource.prototype.limit = function() {
  var args = arguments

  if (args.length === 2) {
    this.param.offset = args[0]
    this.param.limit = args[1]
  }
  else {
    this.param.limit = args[0]
  }
  return this
}

resources = [
    'Comic'
  , 'Character'
  , 'Creator'
  , 'Event'
  , 'Series'
  , 'Story'
]

for (var i = 0; i < resources.length; i++) {
  fn = (function addResource(rsrc) {
    rsrc = plural(lower(rsrc))
    Resource.prototype[rsrc] = function(queryVal) {
      if (this.resource !== rsrc) {
        this.param[rsrc] = queryVal
      }
      return this
    }
  }(resources[i]))
}

module.exports = Resource
