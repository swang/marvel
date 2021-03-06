'use strict'

var should = require('should')
var Marvel = require('../index.js')
var sinon = require('sinon')

describe('Marvel', function() {
  describe('constructor', function() {
    it('should throw an error when public/private keys are missing', function() {
      try {
        var x = new Marvel()
      } catch (e) {
        return e.should.be.an.Error
      }
      should(false).ok()
    })
  })
})

describe('marvel.events.*.get', function() {
  var marvelGet, marvel, json

  beforeEach(function() {
    marvel = new Marvel({
      publicKey: 'xxx',
      privateKey: 'yyy'
    })
    marvelGet = sinon.stub(marvel.events, 'get')
    json = require('./fixtures/event-civil-war.json') // eslint-disable-line global-require
    marvelGet.yields(null, json)
  })
  afterEach(function() {
    marvelGet.restore()
  })
  it('should return civil war data', function() {
    marvel.events
      .name('civil war')
      .limit(5)
      .get(function(err, resp) {
        should.not.exist(err)
        resp[0].id.should.eql(238)
        resp[0].title.should.eql('Civil War')
        resp[0].resourceURI.should.eql(
          'http://gateway.marvel.com/v1/public/events/238'
        )
        resp[0].should.have.properties(
          'comics',
          'series',
          'stories',
          'characters',
          'urls',
          'thumbnail',
          'resourceURI'
        )
      })
  })
})

describe('marvel.characters.*.get', function() {
  var marvelGet, marvel, json

  beforeEach(function() {
    marvel = new Marvel({
      publicKey: 'xxx',
      privateKey: 'yyy'
    })
    marvelGet = sinon.stub(marvel.characters, 'get')
    json = require('./fixtures/character-hulk.json') // eslint-disable-line global-require
    marvelGet.yields(null, json)
  })
  afterEach(function() {
    marvelGet.restore()
  })
  it('should return hulk data', function() {
    marvel.characters.name('Hulk').get(function(err, resp) {
      should.not.exist(err)
      resp[0].id.should.eql(1009351)
      resp[0].name.should.eql('Hulk')
      resp[0].resourceURI.should.eql(
        'http://gateway.marvel.com/v1/public/characters/1009351'
      )
      resp[0].should.have.properties(
        'comics',
        'series',
        'stories',
        'events',
        'urls',
        'thumbnail',
        'resourceURI'
      )
    })
  })
})
