# Guestlist

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/i-like-robots/guestlist/blob/master/LICENSE) [![Build Status](https://travis-ci.org/i-like-robots/guestlist.svg?branch=master)](https://travis-ci.org/i-like-robots/guestlist) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/guestlist/badge.svg?branch=master)](https://coveralls.io/github/i-like-robots/guestlist) [![npm version](https://img.shields.io/npm/v/guestlist.svg?style=flat)](https://www.npmjs.com/package/guestlist)

Whitelists, validates, and sanitizes all of your request properties. Compatible with Express and Fastify.

```js
const guestlist = require('guestlist')

// Create a new guard to check query string properties
const queryGuard = guestlist.guard()
  .query('term', guestlist.rule().isLength({ min: 2 }).trim().escape())
  .query('page', guestlist.rule().isInt({ min: 1, max: 100 }).toInt(), { default: 1 })
  .query('date', guestlist.rule().isISO8601().toDate())
  .query('tags', guestlist.rule().isInt().toInt(), { array: true })

// Apply guard as middleware to the route to secure
app.get('/search', queryGuard.secure(), (req, res, next) => { … })
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

Guestlist exports two methods:-

### `.guard()`

Returns a new instance of [`Guard`](#api-guard).

### `.rule()`

Returns a new instance of [`Rule`](#api-rule).

See the [`examples/`][examples] directory for further usage help.

[examples]: https://github.com/i-like-robots/guestlist/tree/master/examples

## API

<a name="api-guard"></a>
### `Guard`

The `Guard` class maintains a list of locations and properties to check and the rules each request property must follow. This class also generates the middleware used to secure a route in your application.

### `.body(property, rule[, options])`

Checks a property with the given rule in the request body (_note:_ requires post body parsing middleware such as [`body-parser`](https://www.npmjs.com/package/body-parser)).

### `.cookie(property, rule[, options])`

Checks a property with the given rule in the request cookies (_note:_ requires cookie parsing middleware such as [`cookie-parser`](https://www.npmjs.com/package/cookie-parser)).

### `.param(property, rule[, options])`

Checks a property with the given rule in the request parameters.

### `.query(property, rule[, options])`

Checks a property with the given rule in the request querystring.

### `.secure()`

Returns the [`Secure`](#api-secure) middleware function for the guard.

### Options

Each of the Guard methods accepts a set of options as the final argument. The currently supported options are:-

- `array` If true any single values will be transformed into an array. When false only the last member of any array-like values will be passed through. Defaults to `false`.
- `default` Set a default value for properties which are undefined or invalid

<a name="api-rule"></a>
### `Rule`

The `Rule` class provides a fluent interface over [validator.js]. All validator and sanitizer methods are available and chainable. Validators will always be called before sanitizers and and they will be called in the order in which they were declared.

[validator.js]: https://www.npmjs.com/package/validator

<a name="api-secure"></a>
### `Secure`

## Development

Guestlist follows the [Standard] code style, includes [TypeScript] declarations and is tested with [Jasmine].

[TypeScript]: https://www.typescriptlang.org/
[Standard]: https://standardjs.com/
[Jasmine]: http://jasmine.github.io/
