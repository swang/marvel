'use strict';

var request = require('request')
  , crypto = require('crypto')
  , plural = require('plural')
  // , qs = require('querystring')

plural.addRule(/series/i, function(w) { return w })

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
// lowercase helper
var lower = function(s) {
  return s.toLowerCase()
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

var Resource = function(resource, opts) {
  this.resource = resource
  this.param = {}
  this.apiDomain = opts.apiDomain
  this.publicKey = opts.publicKey
  this.privateKey = opts.privateKey
}

Resource.prototype.hash = function(ts) {
  return crypto.createHash('md5').update(String(ts) + this.privateKey + this.publicKey).digest('hex')
}

Resource.prototype.get = function (cb) {
  var uri
    , qs
    , ts = +new Date()
    , uri

  uri = this.apiDomain + "/" + Marvel.API_VERSION + "/public/" + lower(this.resource) //+ qs.stringify(this.param)
  console.log(uri)
  qs = {
      apikey: this.publicKey
    , ts: ts
    , hash: this.hash(ts)
  }
  qs = merge(qs, this.param)
  console.log(uri, qs)

  request({
    uri: uri,
    qs: qs,
    strictSSL: false
  }, responseFn(cb))

  this.param = {}

}

Resource.prototype.offset = function(offset) {
  this.param.offset = offset
  return this
}

Resource.prototype.limit = function(num) {
  var args = arguments;
  if (args.length === 2) {
    this.param.offset = args[0]
    this.param.limit = args[1]
  }
  else {
    this.param.limit = args[0]
  }
  return this
}
Resource.prototype.issueNumber = function(issueNumber) {
  this.param.issueNumber = issueNumber
  return this
}
Resource.prototype.orderBy = function(orderBy) {
  this.param.orderBy = orderBy
  return this
}

Resource.prototype.titleStartsWith = function(titleStartsWith) {
  this.param.titleStartsWith = titleStartsWith
  return this
}

Resource.prototype.title = function(title) {
  this.param.title = title
  return this
}

Resource.prototype.startYear = function(startYear) {
  this.param.startYear = startYear
  return this
}

Resource.prototype.nameStartsWith = function(nameStartsWith) {
  this.param.nameStartsWith = nameStartsWith
  return this
}

Resource.prototype.name = function(name) {
  this.param.name = name
  return this
}

var resources = ['Comic', 'Character', 'Creator', 'Event', 'Series', 'Story']

for (var i = 0; i < resources.length; i++) {
  var addResource = function(rsrc) {
    rsrc = plural(lower(rsrc))
    Resource.prototype[rsrc] = function(queryVal) {
      if (this.resource !== rsrc) {
        this.param[rsrc] = queryVal
      }
      return this
    }
  }(resources[i])
}

module.exports = Marvel
