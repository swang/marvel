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

var lower = function(s) {
  return s.toLowerCase()
}

var Resource
var resources
var res

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
  var self = this
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function(resolve, reject) {
      self._get(function(err, res) {
        if (err) return reject(err)
        return resolve(res)
      })
    })
  } else {
    self._get(cb)
  }
}
Resource.prototype._get = function(cb) {
  var uri
  var qs
  var ts = +new Date()

  uri =
    this.apiDomain + '/' + this.API_VERSION + '/public/' + lower(this.resource)

  qs = {
    apikey: this.publicKey,
    ts: ts,
    hash: this.hash(ts),
    ...this.param
  }

  var fullUrl = uri + '?' + querystring.stringify(qs)
  http
    .get(
      {
        ...url.parse(fullUrl),
        headers: {
          'Accept-Encoding': 'gzip'
        },
        encoding: null
      },
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

        /* istanbul ignore next */
        res.on('error', function(e) {
          return cb(e)
        })
      }
    )
    .on('error', function(err) {
      return cb(err)
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
  ;(function addResource(rsrc) {
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
