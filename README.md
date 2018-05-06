# Guestlist

[![Build Status](https://travis-ci.org/i-like-robots/guestlist.svg?branch=master)](https://travis-ci.org/i-like-robots/guestlist) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/guestlist/badge.svg?branch=master)](https://coveralls.io/github/i-like-robots/guestlist) [![npm version](https://badge.fury.io/js/guestlist.svg)](https://badge.fury.io/js/guestlist)

Whitelists, validates, and sanitizes all of your request properties. Compatible with Express and Fastify.

```js
const guestlist = require('guestlist')

// Create a new guard to check query string properties
const queryGuard = guestlist.guard()
  .query('term', guestlist.rule().isLength({ min: 2 }).trim().escape())
  .query('page', guestlist.rule().isInt({ min: 1, max: 100 }).toInt())
  .query('date', guestlist.rule().isISO8601().toDate())
  .query('tags', guestlist.rule().isInt().toInt(), { multiple: true })

// Apply guard as middleware to the route to secure
app.get('/search', guestlist.secure(queryGuard), (req, res, next) => { … })
```

With the middleware checking your route any request properties that are not expected or do not follow the rules will be ejected. In other words:

> If you're not on the list, you're not coming in!

## Installation

This is a [Node.js] module available through the [npm] registry.

Node 6 or higher is required.

[Node.js]: https://nodejs.org/
[npm]: http://npmjs.com/

You can install using the package manager of your choice:

```sh
# installation with NPM
$ npm install -S guestlist

# or install using Yarn
$ yarn add guestlist
```

## Usage

Guestlist exports three methods:-

### `.guard()`

Returns a new instance of [`Guard`](#api-guard) on which to add locations (`req.body`, `req.cookies`, `req.params`, or `req.query`) and properties to check.

### `.rule()`

Returns a new instance of [`Rule`](#api-rule) on which to declare validator and sanitizer criteria.

### `.secure(guard)`

Returns a new instance of the [`Secure`](#api-secure) middleware for the given `Guard`.

---

See the `examples/` directory for further help.

## API

<a name="api-guard"></a>
### `Guard`

The `Guard` class maintains a list of locations and properties to check and the rules each property must follow. This class also generates middleware to secure a route.

### `body(property, rule[, options])`

Checks a property with the given rule in `req.body`.

### `cookie(property, rule[, options])`

Checks a property with the given rule in `req.cookies`.

### `param(property, rule[, options])`

Checks a property with the given rule in `req.params`.

### `query(property, rule[, options])`

Checks a property with the given rule in `req.query`.

### Options

Each method accepts a map of options as the final argument  currently supported options are:-

- `multiple` If true any single values will be transformed into an array. When false only the last member of any array-like values will be passed through. Defaults to `false`.

<a name="api-rule"></a>
### `Rule`

The `Rule` class provides a fluent interface over [validator.js]. All validator and sanitizer methods are available and chainable. Validators will always be called before sanitizers and and they will be called in the order in which they were declared.

[validator.js]: https://www.npmjs.com/package/validator

<a name="api-secure"></a>
### `Secure`

Nothing here yet…

## Development

Guestlist is written [TypeScript] and follows JavaScript [Standard] style and is tested with [Jasmine]

[TypeScript]: https://www.typescriptlang.org/
[Standard]: https://standardjs.com/
[Jasmine]: http://jasmine.github.io/
