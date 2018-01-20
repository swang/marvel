'use strict';

module.exports = {
    characters: [
      'name'
    , 'nameStartsWith'
    , 'modifiedSince'
    , 'orderBy'
    , 'offset'
  ]
  , comics: [
      'format'
    , 'formatType'
    , 'noVariants'
    , 'dateDescriptor'
    , 'dateRange'
    , 'title'
    , 'titleStartsWith'
    , 'startYear'
    , 'issueNumber'
    , 'diamondCode'
    , 'digitalId'
    , 'upc'
    , 'isbn'
    , 'ean'
    , 'issn'
    , 'hasDigitalIssue'
    , 'modifiedSince'
    , 'sharedAppearances'
    , 'collaborators'
    , 'orderBy'
    , 'offset'
  ]
  , creators: [
      'firstName'
    , 'middleName'
    , 'lastName'
    , 'suffix'
    , 'nameStartsWith'
    , 'firstNameStartsWith'
    , 'middleNameStartsWith'
    , 'lastNameStartsWith'
    , 'modifiedSince'
    , 'orderBy'
    , 'offset'
  ]
  , events: [
      'name'
    , 'nameStartsWith'
    , 'modifiedSince'
    , 'orderBy'
    , 'offset'
  ]
  , series: [
      'title'
    , 'titleStartsWith'
    , 'startYear'
    , 'modifiedSince'
    , 'seriesType'
    , 'contains'
    , 'orderBy'
    , 'offset'
  ]
  , stories: [
      'modifiedSince'
    , 'comics'
    , 'series'
    , 'events'
    , 'creators'
    , 'characters'
    , 'orderBy'
    , 'offset'
  ]
}
