var request = require('request')
  , crypto = require('crypto')
  , plural = require('plural').addRule(/series/i, function(w) { return w })

// lowercase helper
var lower = function(s) {
  return s.toLowerCase()
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
  var uri, qs, ts = +new Date()

  uri = this.apiDomain + "/" + Marvel.API_VERSION + "/public/" + lower(this.resource) //+ qs.stringify(this.param)

  qs = merge({
      apikey: this.publicKey
    , ts: ts
    , hash: this.hash(ts)
  }, this.param)

  request({
    uri: uri,
    qs: qs,
    strictSSL: false
  }, responseFn(cb))

  this.param = {}

}

var resourceCalls, res, fn

resourceCalls = [
  'issueNumber'
, 'name'
, 'nameStartsWith'
, 'offset',
, 'orderBy'
, 'startYear'
, 'title'
, 'titleStartsWith'
]

for (var h = 0; h < resourceCalls.length; h++) {
  res = resourceCalls[h]
  fn = function addResourceCall(res) {
    Resource.prototype[res] = function(val) {
      this.param[res] = val
      return this
    }
  }(res)
}

Resource.prototype.limit = function() {
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

var resources = ['Comic', 'Character', 'Creator', 'Event', 'Series', 'Story']

for (var i = 0; i < resources.length; i++) {
  var fn = function addResource(rsrc) {
    rsrc = plural(lower(rsrc))
    Resource.prototype[rsrc] = function(queryVal) {
      if (this.resource !== rsrc) {
        this.param[rsrc] = queryVal
      }
      return this
    }
  }(resources[i])
}

module.exports = Resource
