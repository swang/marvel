'use strict';

var should = require('should')
  , Marvel = require('../index.js')

describe('Marvel', function() {
  describe('constructor', function() {
    it('should throw an error when public/private keys are missing', function() {
      try {
        var x = new Marvel()
      }
      catch (e) {
        return e.should.be.an.Error
      }
      should(false).ok()
    })
  })
})
