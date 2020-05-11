'use strict'

var should = require('should'),
  Resource = require('../lib/resource.js'),
  sinon = require('sinon')

var https = require('https')
var fs = require('fs')
var IncomingMessage = require('http').IncomingMessage

var opts = {
  API_VERSION: 'v1',
  publicKey: 'aaa',
  privateKey: 'bbb',
  apiDomain: 'https://gateway.marvel.com',
  gzip: true
}

var fakeHttpResponse = function(fixtureFile) {
  var httpGet = sinon.stub(https, 'get').callsFake(function(_opts, _cb) {
    var im = new IncomingMessage('test-socket')
    _cb(im)
    im._read = function() {}
    im.emit('data', fs.readFileSync('./test/fixtures/' + fixtureFile))
    im.emit('end')
    return httpGet
  })
  httpGet.on = function() {}
  return httpGet
}

describe('Resource', function() {
  var resourceCalls, test

  beforeEach(function(done) {
    test = new Resource('characters', opts)
    done()
  })

  describe('hash', function() {
    it('should return a proper hash', function() {
      test.hash('1234').should.equal('ad22a55bbfa12a3628abf69ff7e6074f')
    })
  })

  resourceCalls = ['name', 'nameStartsWith', 'offset', 'orderBy']

  for (var i = 0; i < resourceCalls.length; i++) {
    ;(function(descTest) {
      describe(descTest, function() {
        it('should set ' + descTest + ' in `params` property', function() {
          test[descTest]('_abcd')
          test.param[descTest].should.equal('_abcd')
        })
      })
    })(resourceCalls[i])
  }

  describe('limit', function() {
    it('should set limit properly when called with one param', function() {
      test.limit(20)
      test.param.limit.should.equal(20)
    })
    it('should set offset and limit when called with two params', function() {
      test.limit(5, 10)
      test.param.offset.should.equal(5)
      test.param.limit.should.equal(10)
    })
  })
  describe('test a Resource() object', function() {
    var r
    beforeEach(function() {
      r = new Resource('characters', opts)
    })

    it('should find subproperty resources for a resource', function() {
      var fakeThis = {
        resource: 'events',
        param: {}
      }
      var actual = r.characters.bind(fakeThis)('Hulk')
      var result = { resource: 'events', param: { characters: 'Hulk' } }
      actual.should.eql(result)
    })

    it('should not allow the same resource/subresource', function() {
      var fakeThis = {
        resource: 'characters',
        param: {}
      }
      var actual = r.characters.bind(fakeThis)('Hulk')
      var result = { resource: 'characters', param: {} }
      actual.should.eql(result)
    })
  })

  describe('test a Resource() http calls', function() {
    var _httpGet
    var r
    beforeEach(function() {
      r = new Resource('characters', opts)
    })

    afterEach(function() {
      if (_httpGet) _httpGet.restore()
    })

    it('should read response from http.get', function(done) {
      _httpGet = fakeHttpResponse('character-hulk-resp.json.gz')

      r.characters('Hulk').get(function(err, res) {
        should.not.exist(err)
        res[0].name.should.eql('Hulk')
        // _httpGet.restore()
        done()
      })
    })

    it('should error when the server doesnt return a gzip', function(done) {
      _httpGet = fakeHttpResponse('bad.gz')

      r.characters('Hulk').get(function(err, res) {
        should.exist(err)
        should.exist(err.message)
        err.message.should.match(/not a gzip result/i)
        should.not.exist(res)
        done()
      })
    })

    it('should error when the server doesnt return a valid json', function(done) {
      _httpGet = fakeHttpResponse('bad.json.gz')

      r.characters('Hulk').get(function(err, res) {
        should.exist(err)
        should.exist(err.message)
        err.message.should.match(/was not a JSON/i)
        should.not.exist(res)
        done()
      })
    })

    it('should return a promise if the getter function has no parameters passed', function(done) {
      var json = require('./fixtures/character-hulk.json') // eslint-disable-line global-require
      var _get = sinon.stub(Resource.prototype, '_get').yields(null, json)
      var x = Resource.prototype.get()
      x.should.be.Promise()
      x.then(function(res) {
        should.exist(res)
      }).catch(function(err) {
        should.fail(err)
      })
      _get.restore()

      var _getError = sinon
        .stub(Resource.prototype, '_get')
        .yields(new Error('fakeerror'))
      var y = Resource.prototype.get()
      y.should.be.Promise()
      y.catch(function(err) {
        should.exist(err)
        done()
      })
      _getError.restore()
    })
  })
})
