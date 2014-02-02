# marvel
Marvel is an API wrapper for Marvel's Comics API

[![Build Status](https://travis-ci.org/swang/marvel.png?branch=master)](https://travis-ci.org/swang/marvel)

# install

```
npm install marvel
```

# example

```js
var Marvel = require('marvel')

var marvel = new Marvel({ publicKey: "<pubKey>", privateKey: "<privateKey>"})

marvel.getCharacters({ name: "Hulk" }, function(err, resp) {
  if (err) {
    console.log("Error: ", err)
  }
  else {
    console.log("Response: ", resp)
  }
})
```

# documentation

## getCharacters(parameters, callback)
`/v1/public/characters`

Fetches lists of comic characters with optional filters.

## getCharactersById(characterId, parameters, callback)
`/v1/public/characters/{characterId}`

This method fetches a single character resource.  It is the canonical URI for any character resource provided by the API.

## getCharactersByComicId(comicId, parameters, callback)
`/v1/public/comics/{comicId}/characters`

Fetches lists of characters which appear in a specific comic with optional filters.

## getCharactersByCreatorId(creatorId, parameters, callback)

## getCharactersByEventId(eventId, parameters, callback)
`/v1/public/events/{eventId}/characters`

Fetches lists of characters which appear in a specific event, with optional filters.

## getCharactersBySeriesId(seriesId, parameters, callback)
`/v1/public/series/{seriesId}/characters`

Fetches lists of characters which appear in specific series, with optional filters.

## getCharactersByStoryId(storyId, parameters, callback)
`/v1/public/stories/{storyId}/characters`

Fetches lists of comic characters appearing in a single story, with optional filters.

## getComics(parameters, callback)
`/v1/public/comics`

Fetches lists of comics with optional filters.

## getComicsById(comicId, parameters, callback)
`/v1/public/comics/{comicId}`

This method fetches a single comic resource.  It is the canonical URI for any comic resource provided by the API.

## getComicsByCharacterId(characterId, parameters, callback)
`/v1/public/characters/{characterId}/comics`

Fetches lists of comics containing a specific character, with optional filters.

## getComicsByCreatorId(creatorId, parameters, callback)
`/v1/public/creators/{creatorId}/comics`

Fetches lists of comics in which the work of a specific creator appears, with optional filters.

## getComicsByEventId(eventId, parameters, callback)
`/v1/public/events/{eventId}/comics`

Fetches lists of comics which take place during a specific event, with optional filters.

## getComicsBySeriesId(seriesId, parameters, callback)
`/v1/public/series/{seriesId}/comics`

Fetches lists of comics which are published as part of a specific series, with optional filters.

## getComicsByStoryId(storyId, parameters, callback)
`/v1/public/stories/{storyId}/comics`

Fetches lists of comics in which a specific story appears, with optional filters.

## getCreators(parameters, callback)
`/v1/public/creators`

Fetches lists of comic creators with optional filters.

## getCreatorsById(creatorId, parameters, callback)
`/v1/public/creators/{creatorId}`

This method fetches a single creator resource.  It is the canonical URI for any creator resource provided by the API.

## getCreatorsByComicId(comicId, parameters, callback)
`/v1/public/comics/{comicId}/creators`

Fetches lists of comic creators whose work appears in a specific comic, with optional filters.

## getCreatorsByCharacterId(characterId, parameters, callback)
## getCreatorsByEventId(eventId, parameters, callback)
`/v1/public/events/{eventId}/creators`

Fetches lists of comic creators whose work appears in a specific event, with optional filters.

## getCreatorsBySeriesId(seriesId, parameters, callback)
`/v1/public/series/{seriesId}/creators`

Fetches lists of comic creators whose work appears in a specific series, with optional filters.

## getCreatorsByStoryId(storyId, parameters, callback)
`/v1/public/stories/{storyId}/creators`

Fetches lists of comic creators whose work appears in a specific story, with optional filters.

## getEvents(parameters, callback)
`/v1/public/events`

Fetches lists of events with optional filters.

## getEventsById(eventId, parameters, callback)
`/v1/public/events/{eventId}`

This method fetches a single event resource.  It is the canonical URI for any event resource provided by the API.

## getEventsByComicId(comicId, parameters, callback)
`/v1/public/comics/{comicId}/events`

Fetches lists of events in which a specific comic appears, with optional filters.

## getEventsByCharacterId(characterId, parameters, callback)
`/v1/public/characters/{characterId}/events`

Fetches lists of events in which a specific character appears, with optional filters.

## getEventsByCreatorId(creatorId, parameters, callback)
`/v1/public/creators/{creatorId}/events`

Fetches lists of events featuring the work of a specific creator with optional filters.

## getEventsBySeriesId(seriesId, parameters, callback)
`/v1/public/series/{seriesId}/events`

Fetches lists of events which occur in a specific series, with optional filters.

## getEventsByStoryId(storyId, parameters, callback)
`/v1/public/stories/{storyId}/events`

Fetches lists of events in which a specific story appears, with optional filters.

## getSeries(parameters, callback)
`/v1/public/series`

Fetches lists of comic series with optional filters.

## getSeriesById(seriesId, parameters, callback)
`/v1/public/series/{seriesId}`

This method fetches a single comic series resource.  It is the canonical URI for any comic series resource provided by the API.

## getSeriesByComicId(comicId, parameters, callback)
## getSeriesByCharacterId(characterId, parameters, callback)
## getSeriesByCreatorId(creatorId, parameters, callback)
## getSeriesByEventId(eventId, parameters, callback)
## getSeriesByStoryId(storyId, parameters, callback)

## getStories(parameters, callback)
`/v1/public/stories`

Fetches lists of comic stories with optional filters.

## getStoriesById(storyId, parameters, callback)
`/v1/public/stories/{storyId}`

This method fetches a single comic story resource.  It is the canonical URI for any comic story resource provided by the API.

## getStoriesByComicId(comicId, parameters, callback)
`/v1/public/comics/{comicId}/stories`

Fetches lists of comic stories in a specific comic issue, with optional filters.

## getStoriesByCharacterId(characterId, parameters, callback)
`/v1/public/characters/{characterId}/stories`

Fetches lists of comic stories featuring a specific character with optional filters.

## getStoriesByCreatorId(creatorId, parameters, callback)
`/v1/public/creators/{creatorId}/stories`

Fetches lists of comic stories by a specific creator with optional filters.

## getStoriesByEventId(eventId, parameters, callback)
`/v1/public/events/{eventId}/stories`

Fetches lists of comic stories from a specific event, with optional filters.

## getStoriesBySeriesId(seriesId, parameters, callback)
`/v1/public/series/{seriesId}/stories`

Fetches lists of comic stories from a specific series with optional filters.

# license
MIT
