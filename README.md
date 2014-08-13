# marvel
Marvel is an API wrapper for Marvel's Comics API

[![Build Status](https://travis-ci.org/swang/marvel.png?branch=master)](https://travis-ci.org/swang/marvel)

This is a new version of the library where the API is a bit clearer about what you're searching for.

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

##### #name(str)
Searchs for the character named, `str`.

##### #nameStartsWith(str)
Searches for characters whose name begins with `str`.

##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(str)
Orders the returning JSON by the field `str`. If a minus sign (-) is in front of the `str`, then it orders in descending order.

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, limit)
If two parameters are given, it returns `limit` results only after `offset` matches have occurred.
If only one parameter is given, it returns the first `limit` results.

> ## comics

##### #format
##### #formatType
##### #noVariants
##### #dateDescriptor
##### #dateRange
##### #title
##### #titleStartsWith

##### #startYear(num)
Limits results to comic series that started in the year `num`


##### #issueNumber(num)
Looks only for comics whose issue number match `num`

##### #diamondCode
##### #digitalId
##### #upc
##### #isbn'
##### #ean
##### #issn
##### #hasDigitalIssue
##### #sharedAppearances
##### #collaborators

##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(str)
Orders the returning JSON by the field `str`. If a minus sign (-) is in front of the `str`, then it orders in descending order.

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, limit)
If two parameters are given, it returns `limit` results only after `offset` matches have occurred.
If only one parameter is given, it returns the first `limit` results.

> ## creators

##### #firstName
##### #middleName
##### #lastName
##### #suffix
##### #nameStartsWith
##### #firstNameStartsWith
##### #middleNameStartsWith
##### #lastNameStartsWith
##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(str)
Orders the returning JSON by the field `str`. If a minus sign (-) is in front of the `str`, then it orders in descending order.

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, limit)
If two parameters are given, it returns `limit` results only after `offset` matches have occurred.
If only one parameter is given, it returns the first `limit` results.

> ## events

##### name
##### #nameStartsWith

##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(str)
Orders the returning JSON by the field `str`. If a minus sign (-) is in front of the `str`, then it orders in descending order.

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, limit)
If two parameters are given, it returns `limit` results only after `offset` matches have occurred.
If only one parameter is given, it returns the first `limit` results.

> ## series

##### #title
##### #titleStartsWith
##### #startYear
##### #seriesType
##### #contains

##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(str)
Orders the returning JSON by the field `str`. If a minus sign (-) is in front of the `str`, then it orders in descending order.

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, limit)
If two parameters are given, it returns `limit` results only after `offset` matches have occurred.
If only one parameter is given, it returns the first `limit` results.

> ## stories

##### #modifiedSince(date)
Limits results to characters that have been modified after inputed `date` (format is: 2014-06-10T16:12:58-0400).

##### #orderBy(str)
Orders the returning JSON by the field `str`. If a minus sign (-) is in front of the `str`, then it orders in descending order.

##### #offset(num)
Returns results only after `num` matches have occurred.

##### #limit(offset, limit)
If two parameters are given, it returns `limit` results only after `offset` matches have occurred.
If only one parameter is given, it returns the first `limit` results.

# license
MIT
