# marvel
Marvel is an API wrapper for Marvel's Comics API

[![Build Status](https://travis-ci.org/swang/marvel.png?branch=master)](https://travis-ci.org/swang/marvel)

### v1.1 will be the last release to support node v0.10.0/v0.12.0

# install

```
npm install marvel
```

# examples

```js
var Marvel = require('marvel')

var marvel = new Marvel({ publicKey: "<pubKey>", privateKey: "<privateKey>"})

marvel.characters
  .name("Hulk")
  .get(function(err, resp) {
    if (err) { console.log("Error: ", err) }
    else { console.log(resp) }
  })
```

This finds out the event id for "Civil War" and then returns 50 characters that were in the event (along with their thumbnail picture, if applicable)

```js
var Marvel = require('marvel')

var marvel = new Marvel({ publicKey: "<pubKey>", privateKey: "<privateKey>"})

marvel.events
  .name("civil war")
  .get(function(err, res) {
    if (err) { throw err }
    var eventId = res[0].id

    marvel.characters
      .events(eventId)
      .limit(50)
      .get(function(err, res) {
        if (err) { throw err }
        res.forEach(function(chr) {
          console.log(chr.name + " " + (!!chr.thumbnail ? (chr.thumbnail.path + "." + chr.thumbnail.extension) : ""))
        })
      })
  })
```

# documentation

This new version of the Marvel library tries to make it easier to form queries.

> ## characters

##### #id(character_id)
Searches for a character with an id of, `character_id`.

##### #name(name)
Searches for the character named, `name`.

##### #nameStartsWith(name)
Searches for characters whose name begins with `name`.

##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(field)
Orders the returning JSON by the field, `field`. If a minus sign (-) is in front of the `field`, then it returns in descending order.

Options are: name, modified, -name, -modified

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, num)
If two parameters are given, it returns `num` results only after `offset` records have been returned.
If only one parameter is given, it returns the first `num` results.

> ## comics

##### #id(comic_id)
Searches for a comic with an id of, `comic_id`.

##### #format(name)
Return comics that only contain format, `name`

Options are: comic, magazine, trade paperback, hardcover, digest, graphic novel, digital comic, infinite comic

##### #formatType(type)
Return comics that only contain format type, `type`

Options are: comic, collection

##### #noVariants(bool)
Whether or not to exclude "variants" of the comic, e.g. alternate covers (true for yes, false for no)

##### #dateDescriptor(dateString)
Return comics within the time period specified in `dateString`

Options are: lastWeek, thisWeek, nextWeek, thisMonth

##### #dateRange(date[, date2, date3])
Return comics within the predefined range in `date` with additional dates separated by commas

##### #title(name)
Searches for comics named, `name`.

##### #titleStartsWith(name)
Searches for comics whose name begins with `name`.

##### #startYear(num)
Limits results to comic series that started in the year `num`

##### #issueNumber(num)
Looks only for comics whose issue number match `num`

##### #diamondCode(code)
Filter by Diamond Code `code`

##### #digitalId(num)
Filter by Digital ID, `num`

##### #upc(code)
Filter by UPC code, `code`

##### #isbn(code)
Filter by ISBN code, `code`

##### #ean(code)
Filter by EAN code, `code`

##### #issn(code)
Filter by ISSN code, `code`

##### #hasDigitalIssue(bool)
Includes only results which are available digitally if `bool` is true.

##### #sharedAppearances(charId[, charId2, charId3])
Accepts a comma-separated list of IDs which match only comics in which those characters have appeared together

##### #collaborators(creatorId[, creatorId2, creatorId3])
Accepts a comma-separated list of IDs which match only comics in which those creators have appeared together

##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(field)
Orders the returning JSON by the field, `field`. If a minus sign (-) is in front of the `field`, then it returns in descending order.

Options are: focDate, onsaleDate, title, issueNumber, modified, -focDate, -onsaleDate, -title, -issueNumber, -modified

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, num)
If two parameters are given, it returns `num` results only after `offset` records have been returned.
If only one parameter is given, it returns the first `num` results.

> ## creators

##### #id(creator_id)
Searches for a creator with an id of, `creator_id`.

##### #firstName(name)
Searches for creators with first name, `name`.

##### #middleName(name)
Searches for creator with middle name, `name`.

##### #lastName(name)
Searches for creator with last name, `name`.

##### #suffix(name)
Searches for creator with suffix/honorific, `name`.

##### #nameStartsWith(str)
Searches for creator's name that begins with `str`.

##### #firstNameStartsWith(str)
Searches for creator's first name that begins with `str`.

##### #middleNameStartsWith(str)
Searches for creator's middle name that begins with `str`.

##### #lastNameStartsWith(str)
Searches for creator's last name that begins with `str`.

##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(field)
Orders the returning JSON by the field, `field`. If a minus sign (-) is in front of the `field`, then it returns in descending order.

Options are: lastName, firstName, middleName, suffix, modified, -lastName, -firstName, -middleName, -suffix, -modified

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, num)
If two parameters are given, it returns `num` results only after `offset` records have been returned.
If only one parameter is given, it returns the first `num` results.

> ## events

##### #id(event_id)
Searches for an event with an id of `event_id`.

##### #name(name)
Searches for the event named, `name`.

##### #nameStartsWith(name)
Searches for events whose name begins with `name`.

##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(field)
Orders the returning JSON by the field, `field`. If a minus sign (-) is in front of the `field`, then it returns in descending order.

Options are: name, startDate, modified, -name, -startDate, -modified

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, num)
If two parameters are given, it returns `num` results only after `offset` records have been returned.
If only one parameter is given, it returns the first `num` results.

> ## series

##### #id(series_id)
Searches for a series with an id of `series_id`.

##### #title(name)
Searches for series named, `name`.

##### #titleStartsWith(name)
Searches for series whose name begins with `name`.

##### #startYear(num)
Limits results to comic series that started in the year `num`

##### #seriesType(type)
Filter the series by publication frequency type.

Options are: collection, one shot, limited, ongoing

##### #contains(format[,format2])
Return only series that contain one or more comics with the specified format

Options are: comic, magazine, trade paperback, hardcover, digest, graphic novel, digital comic, infinite comic

##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(field)
Orders the returning JSON by the field, `field`. If a minus sign (-) is in front of the `field`, then it returns in descending order.

Options are: title, modified, startYear, -title, -modified, -startYear

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, num)
If two parameters are given, it returns `num` results only after `offset` records have been returned.
If only one parameter is given, it returns the first `num` results.

> ## stories

##### #id(story_id)
Searches for a story with an id of `story_id`.

##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(str)
Orders the returning JSON by the field `str`. If a minus sign (-) is in front of the `str`, then it orders in descending order.

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, num)
If two parameters are given, it returns `num` results only after `offset` records have been returned.
If only one parameter is given, it returns the first `num` results.

# license
MIT

# author
Shuan Wang (shuanwang@gmail.com)
