'use strict';

var should = require('should')
  , Marvel = require('../index.js')

describe('Marvel', function() {
  describe('constructor', function() {
    it('should throw an error when public/private keys are missing', function() {
      try {
        new Marvel()
      }
      catch (e) {
        return e.should.be.an.Error
      }
      should(false).ok
    })
  })
  describe('getHash', function() {
    it('should return a proper hash', function() {
      var test = new Marvel({ publicKey: "aaa", privateKey: "bbb" })
      test.getHash("1234").should.equal("ad22a55bbfa12a3628abf69ff7e6074f")
    })
  })
})

// describe('Array', function(){
//   describe('#indexOf()', function(){
//     it('should return -1 when the value is not present', function(){
//       [1,2,3].indexOf(5).should.equal(-1);
//       [1,2,3].indexOf(0).should.equal(-1);
//     })
//   })
// })
