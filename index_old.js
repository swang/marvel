'use strict';

var request = require('request')
  , crypto = require('crypto')
  , plural = require('plural')

plural.addRule(/series/i, function(w) { return w })

var Marvel = function(opts) {
  if (opts.privateKey === undefined || opts.publicKey === undefined) {
    throw new Error('Unable to create a hash because of missing privateKey/publicKey')
  }
  this.publicKey = opts.publicKey
  this.privateKey = opts.privateKey
  this.apiDomain = "http://gateway.marvel.com"
}

var resources = ['Comic', 'Character', 'Creator', 'Event', 'Series', 'Story']
  , responseFn

responseFn = function(callback) {
  return function (err, resp, body) {
    if (!err && resp.statusCode === 200) {
      return callback(err, JSON.parse(body))
    }
    if (resp.statusCode === 429) { // Rate-limit exceeded
      //'{"code":"RequestThrottled","message":"You have exceeded your rate limit.  Please try again later."}'
      return callback(JSON.parse(body))
    }
    return callback(err)
  }
}

Marvel.API_VERSION = "v1"
Marvel.VERSION = require('./package').version

resources.forEach(function(res) {
  var methodName = "get" + plural(res)

  Marvel.prototype[methodName] = function(params, callback) {
    var attr
      , qs
      , ts = +new Date()
      , uri

    qs = {
        apikey: this.publicKey
      , ts: ts
      , hash: this.getHash(ts)
    }

    for (attr in params) {
      if (params.hasOwnProperty(attr)) {
        qs[attr] = params[attr]
      }
    }

    uri = this.apiDomain + "/" + Marvel.API_VERSION + "/public/" + plural(res).toLowerCase()

    request({
      uri: uri,
      qs: qs
    }, responseFn(callback))

  }

  resources.forEach(function(altRes) {
    var methodNameFromProp
    if (res !== altRes) {
      methodNameFromProp = "get" + plural(res) + "By" + altRes + "Id"
    }
    else {
      methodNameFromProp = "get" + plural(altRes) + "ById"
    }
    Marvel.prototype[methodNameFromProp] = function() {
      var args = Array.prototype.slice.call(arguments)
        , attr
        , callback
        , paramId
        , params
        , qs
        , ts = +new Date()
        , uri

      if (args.length === 2) {
        paramId = args[0]
        callback = args[1]
      }
      if (args.length === 3) {
        paramId = args[0]
        params = args[1]
        callback = args[2]
      }
      qs = {
          apikey: this.publicKey
        , ts: ts
        , hash: this.getHash(ts)
      }
      qs[altRes.toLowerCase() + "Id"] = paramId

      for (attr in params) {
        if (params.hasOwnProperty(attr)) {
          qs[attr] = params[attr]
        }
      }
      uri = this.apiDomain + "/" + Marvel.API_VERSION + "/public/" + plural(altRes).toLowerCase() + "/" + paramId + ((res !== altRes) ? ("/" + plural(res).toLowerCase()) : "")

      request({
        uri: uri,
        qs: qs
      }, responseFn(callback))
    }
  })
})

Marvel.prototype.setPublicKey = function(key) {
  this.publicKey = key;
}

Marvel.prototype.setPrivateKey = function(key) {
  this.privateKey = key;
}

Marvel.prototype.getHash = function(ts) {
  return crypto.createHash('md5').update(String(ts) + this.privateKey + this.publicKey).digest('hex')
}

module.exports = Marvel
