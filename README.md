# marvel
Marvel is an API wrapper for Marvel's Comics API

[![Build Status](https://travis-ci.org/swang/marvel.png?branch=master)](https://travis-ci.org/swang/marvel)

This is a new version of the library where the API is a bit clearer about what you're searching for.

# install

```
npm install marvel
```

# example

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

# documentation

This new version of the Marvel library tries to make it easier to form queries.

##### #name(str)
Searchs for the character named, `str`

##### #nameStartsWith(str)
Searches for characters whose name begins with `str`

##### #issueNumber(num)
Looks only for comics whose issue number match `num`

##### #offset(num)
Returns results only after `num` matches have occurred

##### #orderBy(str)
Orders the returning JSON by the field `str`. If a minus sign (-) is in front of the `str`, then it orders in descending order

##### #startYear(num)
Limits results to comic series that started in the year `num`

# license
MIT
