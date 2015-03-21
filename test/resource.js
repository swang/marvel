'use strict';

var should = require('should')
  , Resource = require('../lib/resource.js')

describe('Resource', function() {
  var resourceCalls, test

  beforeEach(function(done) {
    test = new Resource('characters', { publicKey: 'aaa', privateKey: 'bbb' })
    done()
  })

  describe('hash', function() {
    it('should return a proper hash', function() {
      test.hash('1234').should.equal('ad22a55bbfa12a3628abf69ff7e6074f')
    })
  })

  resourceCalls = [
      'issueNumber'
    , 'name'
    , 'nameStartsWith'
    , 'offset'
    , 'orderBy'
    , 'startYear'
    , 'title'
    , 'titleStartsWith'
  ]

  for (var i = 0; i < resourceCalls.length; i++) {
    describe(resourceCalls[i], function() {
      it('should set ' + resourceCalls[i] + ' in `params` property', function() {
        test[resourceCalls[i]]('_abcd')
        test.param[resourceCalls[i]].should.equal('_abcd')
      })
    })
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
