# Guestlist

[![Build Status](https://travis-ci.org/i-like-robots/guestlist.svg?branch=master)](https://travis-ci.org/i-like-robots/guestlist) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/guestlist/badge.svg?branch=master)](https://coveralls.io/github/i-like-robots/guestlist) [![npm version](https://badge.fury.io/js/guestlist.svg)](https://badge.fury.io/js/guestlist)

Whitelists, validates and sanitizes all of your request parameters. Compatible with Express and Fastify.

```js
const guestlist = require('guestlist')

const query = guestlist.guard('query')
  .permit('term', guestlist.rule().trim().escape())
  .permit('date', guestlist.rule().isISO8601().toDate())
  .permit('page', guestlist.rule().isInt({ min: 1, max: 100 }).toInt())

app.get('/search', query.secure(), (req, res, next) => { … });
```

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

### `.guard(property)`

Returns a new instance of [`Guard`](#api-guard) for the request property to monitor, one of:-

- `"query"` for query string parameters
- `"params"` for named route parameters
- `"body"` for data submitted in the request body (requires body parsing middleware such as [body-parser])

### `.rule()`

Returns a new instance of [`Rule`](#api-rule) on which to declare validators and sanitizers.

## API

<a name="api-guard"></a>
### `Guard`

#### `permit(property, rule)`

#### `secure()`

Returns the generated middleware to use.

<a name="api-rule"></a>
### `Rule`

The `Rule` class provides a fluent interface over [validator.js]. All validator and sanitizer methods are available and chainable. Validators will always be called before sanitizers and and they will be called in the order in which they were declared.

[body-parser]: https://www.npmjs.org/package/body-parser
[validator.js]: https://www.npmjs.com/package/validator

## Development

Guestlist is written [TypeScript] and follows JavaScript [Standard] style and is tested with [Jasmine]

[TypeScript]: https://www.typescriptlang.org/
[Standard]: https://standardjs.com/
[Jasmine]: http://jasmine.github.io/
