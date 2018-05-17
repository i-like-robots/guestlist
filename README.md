# Guestlist

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/i-like-robots/guestlist/blob/master/LICENSE) [![Build Status](https://travis-ci.org/i-like-robots/guestlist.svg?branch=master)](https://travis-ci.org/i-like-robots/guestlist) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/guestlist/badge.svg?branch=master)](https://coveralls.io/github/i-like-robots/guestlist) [![npm version](https://img.shields.io/npm/v/guestlist.svg?style=flat)](https://www.npmjs.com/package/guestlist)

Whitelists, validates, and sanitizes your request properties. Compatible with Express and Fastify.

```js
const { guard, rule, secure } = require('guestlist')

// Create a new guard to check query string properties
const queryStringGuard = guard()
  .query('term', rule().isLength({ min: 2 }).trim().escape())
  .query('page', rule().isInt({ min: 1, max: 100 }).toInt(), { default: 1 })
  .query('date', rule().isISO8601().toDate())
  .query('tags', rule().isInt().toInt(), { array: true })

// Apply guard as middleware to the route to secure
app.get('/search', queryStringGuard.secure(), (req, res, next) => { … })
```

With the middleware checking your route any request properties that are not expected or do not follow the rules will be ignored. In other words:

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

Guestlist exports two methods, one to manage the list of request properties to expect and a second to create rules for them to follow:-

1. `.guard()` returns a new instance of [`Guard`](#api-guard).
2. `.rule()` returns a new instance of [`Rule`](#api-rule).

See the [`examples/`][examples] directory for further usage help.

[examples]: https://github.com/i-like-robots/guestlist/tree/master/examples

## API

<a name="api-guard"></a>
### Guard

A `Guard` maintains a list of properties to expect and the rules associated with them. It provides a method for each request location that should be checked (`body`, `cookies`, `params`, and `query`) and one to generate the middleware used to secure a route in your application:-

1. `.body(prop, rule[, options])`

    Checks a property submitted in the request body with the given rule (_note:_ this requires post body parsing middleware to be implemented, such as [`body-parser`](https://www.npmjs.com/package/body-parser)).

2. `.cookie(prop, rule[, options])`

    Checks a cookie sent with the request cookies with the given rule (_note:_ this requires cookie parsing middleware to be implemented, such as [`cookie-parser`](https://www.npmjs.com/package/cookie-parser)).

3. `.param(prop, rule[, options])`

    Checks a named route parameter with the given rule.

4. `.query(prop, rule[, options])`

    Checks a query string parameter with the given rule.

5. `.secure()`

    Returns the [`Secure`](#api-secure) middleware function for the guard.

#### Options

The currently supported options are:-

- `array` If true any single values will be transformed into an array. When false only the last member of any array-like values will be passed through. Defaults to `false`.
- `default` Returns a default value for a property which is undefined or invalid.

<a name="api-rule"></a>
### Rule

`Rule` provides a fluent interface over [validator.js]. All validator and sanitizer methods are available and chainable. Validators will always be called before sanitizers and and they will be called in the order in which they were declared.

[validator.js]: https://www.npmjs.com/package/validator

<a name="api-secure"></a>
### Secure

## Development

Guestlist follows the [Standard] code style, includes [TypeScript] declarations and is tested with [Jasmine].

[TypeScript]: https://www.typescriptlang.org/
[Standard]: https://standardjs.com/
[Jasmine]: http://jasmine.github.io/
