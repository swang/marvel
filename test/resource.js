'use strict';

var should = require('should')
  , Resource = require('../lib/resource.js')

var opts = {
  API_VERSION: 'v1',
  publicKey: 'aaa',
  privateKey: 'bbb',
  apiDomain: 'https://gateway.marvel.com',
  gzip: true
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

  resourceCalls = [
      'name'
    , 'nameStartsWith'
    , 'offset'
    , 'orderBy'
  ]

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

})
