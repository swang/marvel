'use strict'

var querystring = require('querystring')
var url = require('url')
var http = require('https')
var zlib = require('zlib')
var crypto = require('crypto')
var plural = require('plural').addRule(/series/i, function(w) {
  return w
})
var fields = require('./resource_fields')

var Resource, resources, res, lower, merge, hasProp

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
      return function(val) {
        this.param[k] = val
        return this
      }
    })(res)
  }
}

Resource.prototype.hash = function(ts) {
  return crypto
    .createHash('md5')
    .update(String(ts) + this.privateKey + this.publicKey)
    .digest('hex')
}

Resource.prototype.get = function(cb) {
  var uri
  var qs
  var ts = +new Date()

  uri =
    this.apiDomain + '/' + this.API_VERSION + '/public/' + lower(this.resource)

  qs = merge(
    {
      apikey: this.publicKey,
      ts: ts,
      hash: this.hash(ts)
    },
    this.param
  )

  var fullUrl = uri + '?' + querystring.stringify(qs)

  http
    .get(
      merge(url.parse(fullUrl), {
        headers: {
          'Accept-Encoding': 'gzip'
        },
        encoding: null
      }),
      function(res) {
        var rawBuffer = []

        res.on('data', function(chunk) {
          rawBuffer.push(chunk)
        })
        res.on('end', function() {
          var zBuffer = Buffer.concat(rawBuffer)
          zlib.gunzip(zBuffer, function(err, data) {
            if (err)
              return cb(new Error('Result returned was not a gzip result'))
            try {
              var pBody = JSON.parse(data)
            } catch (e) {
              return cb(new Error('Result returned was not a JSON'))
            }
            return cb(null, pBody.data.results, pBody)
          })
        })
        res.on('error', function(e) {
          return cb(e)
        })
      }
    )
    .on('error', function(err) {
      console.log(err)
    })
  this.param = {}
}

Resource.prototype.limit = function() {
  var args = arguments

  if (args.length === 2) {
    this.param.offset = args[0]
    this.param.limit = args[1]
  } else {
    this.param.limit = args[0]
  }
  return this
}

resources = ['Comic', 'Character', 'Creator', 'Event', 'Series', 'Story']

for (var i = 0; i < resources.length; i++) {
  var fn = (function addResource(rsrc) {
    rsrc = plural(lower(rsrc))
    Resource.prototype[rsrc] = function(queryVal) {
      if (this.resource !== rsrc) {
        this.param[rsrc] = queryVal
      }
      return this
    }
  })(resources[i])
}

module.exports = Resource
