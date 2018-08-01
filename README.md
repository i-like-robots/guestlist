# Guestlist

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/i-like-robots/guestlist/blob/master/LICENSE) [![Build Status](https://travis-ci.org/i-like-robots/guestlist.svg?branch=master)](https://travis-ci.org/i-like-robots/guestlist) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/guestlist/badge.svg?branch=master)](https://coveralls.io/github/i-like-robots/guestlist) [![npm version](https://img.shields.io/npm/v/guestlist.svg?style=flat)](https://www.npmjs.com/package/guestlist)

Middleware to whitelist, validate, and sanitize your request properties. Compatible with Express and Fastify.

```js
const { guard, rule, secure } = require('guestlist')

const queryGuard = guard()
  .query('term', rule().isLength({ min: 2 }).trim().escape())
  .query('page', rule().isInt({ min: 1, max: 100 }).toInt(), { default: 1 })
  .query('date', rule().isISO8601().toDate())
  .query('tags', rule().isInt().toInt(), { array: true })

app.get('/search', secure(queryGuard), (req, res, next) => { … })
```

With Guestlist protecting your route any request properties that are not expected or do not follow the rules will not be allowed through. In other words:

> If you're not on the list, you're not coming in!

## Installation

This is a [Node.js] module available through the [npm] registry. Node 6 or higher is required.

Installation is done using the [npm install] command:

```sh
$ npm install -S guestlist
```

[Node.js]: https://nodejs.org/
[npm]: http://npmjs.com/
[npm install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally

## Features

- Validate, sanitize and [coerce] request parameters with [validator.js]
- Concise, fluent API
- Compatible with [Express] and [Fastify]

[validator.js]: https://www.npmjs.com/package/validator
[Express]: https://expressjs.com/
[Fastify]: https://www.fastify.io/

## Usage

Guestlist has three methods; one to create a list of request properties to expect, a second to create rules for properties to follow, and a third to generate the middleware to protect your route.

### Guard

The `guard()` method creates a new list of request properties to expect and the rules associated with them. It provides a method for each request location that can be checked:-

1. `.body(property, rule[, options])`

    Checks a property submitted in the request body (_note:_ this requires post body parsing middleware to be implemented, such as [`body-parser`](https://www.npmjs.com/package/body-parser)).

2. `.cookie(property, rule[, options])`

    Checks a cookie sent with the request cookies (_note:_ this requires cookie parsing middleware to be implemented, such as [`cookie-parser`](https://www.npmjs.com/package/cookie-parser)).

3. `.param(property, rule[, options])`

    Checks a named route parameter.

4. `.query(property, rule[, options])`

    Checks a query string parameter.

Each of the methods accepts an optional `options` object as the final argument. The currently supported options are:-

- `array` If true any single values will be transformed into an array. When false only the last member of any array-like values will be passed through. Defaults to `false`.
- `default` Returns a default value for a property which is undefined or invalid.
- `postprocess` A function to modify the final value

### Rule

The `rule()` method provides a fluent interface for validator.js. All [validator and sanitizer methods][methods] are available and chainable. Validators will always be called before sanitizers and they will be called in the order in which they were declared.

Here are a few example rules for validating and sanitizing numbers, dates, and strings:

```js
// Validate: Assert the value is a number between 1 and 30 and a factor of 3
// Sanitize: Coerce the value to a Number
rule().isInt({ min: 1, max: 30 }).isDivisibleBy(3).toInt()

// Validate: Assert the value is an ISO date string
// Sanitize: Coerce the value to a Date
rule().isISO8601().toDate()

// Validate: Assert the property is a string between 2 and 10 characters
// Sanitize: Escape and trim the value
rule().isLength({ min: 1, max: 10 }).escape().trim()
```

[methods]: https://www.npmjs.com/package/validator#validators

### Secure

The `secure(guard)` method generates the middleware used to protect your route using the expected properties and rules held by the given guard.

## Development

Guestlist follows the [Standard] code style, includes [TypeScript] declarations and is tested with [Jasmine].

[TypeScript]: https://www.typescriptlang.org/
[Standard]: https://standardjs.com/
[Jasmine]: http://jasmine.github.io/
