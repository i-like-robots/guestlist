# Guestlist

[![Build Status](https://travis-ci.org/i-like-robots/guestlist.svg?branch=master)](https://travis-ci.org/i-like-robots/guestlist) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/guestlist/badge.svg?branch=master)](https://coveralls.io/github/i-like-robots/guestlist) [![npm version](https://badge.fury.io/js/guestlist.svg)](https://badge.fury.io/js/guestlist)

Whitelists, validates and sanitizes all of your request parameters. Compatible with Express and Fastify.

```js
const guestlist = require('guestlist')

const query = guestlist.guard('query')
  .permit('term', guestlist.rule().isLength({ min: 2 }).trim().escape())
  .permit('page', guestlist.rule().isInt({ min: 1, max: 100 }).toInt())
  .permit('date', guestlist.rule().isISO8601().toDate())
  .permit('tags', guestlist.rule().isInt().toInt(), { multiple: true })

app.get('/search', guestlist.secure(query), (req, res, next) => { … });
```

Any parameters that are not expected or do not follow the rules will be ejected. In other words:

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

### `.guard(property)`

Returns a new instance of [`Guard`](#api-guard) for the request property to monitor, usually one of:-

- `"query"` for query string parameters
- `"params"` for named route parameters
- `"body"` for data submitted in the request body

### `.rule()`

Returns a new instance of [`Rule`](#api-rule) on which to declare validator and sanitizer criteria.

### `.secure(guard)`

Returns a new instance of the [`Secure`](#api-secure) middleware for the given `Guard`.

---

See the `examples/` directory for further help.

## API

<a name="api-guard"></a>
### `Guard`

The `Guard` class maintains a list of parameters and their rules to follow. The class has one method:

#### `permit(parameter, rule[, options])`

Adds a parameter to the permitted list with the given rule. The current options are:-

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
