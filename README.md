# Guestlist

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/i-like-robots/guestlist/blob/master/LICENSE) [![Build Status](https://travis-ci.org/i-like-robots/guestlist.svg?branch=master)](https://travis-ci.org/i-like-robots/guestlist) [![Coverage Status](https://coveralls.io/repos/github/i-like-robots/guestlist/badge.svg?branch=master)](https://coveralls.io/github/i-like-robots/guestlist) [![npm version](https://img.shields.io/npm/v/guestlist.svg?style=flat)](https://www.npmjs.com/package/guestlist) [![Greenkeeper badge](https://badges.greenkeeper.io/i-like-robots/guestlist.svg)](https://greenkeeper.io/)

Guestlist is small utility to help you whitelist, validate, and sanitize request properties for your web facing apps. It's backed by [validator.js] and works great with [Express], [Fastify], [Polkadot], and more.

[validator.js]: https://www.npmjs.com/package/validator
[Express]: https://expressjs.com/
[Fastify]: https://www.fastify.io/
[Polkadot]: https://github.com/lukeed/polkadot

```js
const { list, rule, validate } = require('guestlist')

const safelist = list()
  .add('term', rule().isLength({ min: 2 }).trim().escape())
  .add('page', rule().isInt({ min: 1, max: 100 }).toInt(), { default: 1 })
  .add('date', rule().isISO8601().toDate())
  .add('tags', rule().isInt().toInt(), { array: true })

app.get('/search', (request, response) => {
  const validProperties = validate(request, safelist)
})
```

Using Guestlist to validate your request properties means that anything not expected or not following the rules will not be allowed through. In other words:

> If you're not on the list, you're not coming in!


## Installation

This is a [Node.js] module available through the [npm] registry. Node 8 or higher is required.

Installation is done using the [npm install] command:

```sh
$ npm install -S guestlist
```

[Node.js]: https://nodejs.org/
[npm]: http://npmjs.com/
[npm install]: https://docs.npmjs.com/getting-started/installing-npm-packages-locally


## Features

- Validate and sanitize request parameters with the full power of [validator.js]
- A concise, fluent API to create lists and rules
- Configurable functions enable compatibility with [Express], [Fastify], [Polkadot], and more


## API

Guestlist has three functions; one to create a safelist of request properties to expect, a second to create rules for a property to follow, and a third to check the request and extract all of the valid properties.

### `list()`

This function creates a new safelist of request properties to expect and maintains the rules associated with them:

```js
const safelist = list()
```

Expected properties are added to the list with the `.add()` method which accepts three arguments: the property name, a rule, and an optional object of `options`.

```js
safelist
  .add(property, rule[, options])
  .add(property, rule[, options])
  .add(property, rule[, options])
```

The currently supported options for are:

- `array` If true any single values will be transformed into an array. When false only the last member of any array-like values will be passed through. Defaults to `false`.
- `default` Returns a default value for a property which is undefined or invalid.

### `rule()`

This function provides a fluent interface for validator.js. All [validator and sanitizer methods][methods] are available and chainable. Validators will always be called before sanitizers and the methods will be called in the order in which they were declared.

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

Occasionally validator.js may not provide the functionality you require. In these cases you may provide a custom validator or sanitizer function:

```js
// Ignore property if a flag is disabled
const checkFlag = () => flagsPoller.get('allowSorting')
rule().customValidator(checkFlag).isIn([ 'asc', 'desc' ])

// Format the date as a YYYY-MM-DD string
const formatDate = (date) => date.toISOString().slice(0, 10);
rule().isISO8601().toDate().customSanitizer(formatDate)
```

[methods]: https://www.npmjs.com/package/validator#validators


### `validate(request, safelist[, locations])`

This function checks a request against a list of rules and extracts all of the valid properties. It accepts three arguments: the request object, a safelist, and an optional array of request objects to check. By default it will look for properties in the following request objects:

- `request.body` (requires post body parsing middleware to be implemented, e.g. [body-parser])
- `request.params`
- `request.query`
- `request.cookies` (requires cookie parsing middleware to be implemented, e.g. [cookie-parser])

```js
const handler = (request, response) => {
  const validProperties = validate(request, safelist)
  response.json(validProperties)
}
```

[body-parser]: https://www.npmjs.com/package/body-parser
[cookie-parser]: https://www.npmjs.com/package/cookie-parser


## Differences to express-validator

The [express-validator] package also wraps validator.js to provide middleware for your express.js apps and Guestlist shares several similarities. The primary difference between the two modules is the way each handles invalid data:

- Guestlist will ignore invalid or unexpected request properties.
- express-validator provides tools for creating error messages and separate methods for retrieving only the valid properties.

If you need to validate the data and return feedback to the user you should use express-validator. If you only need to ignore invalid data then Guestlist may suit you better.

One feature of Guestlist which is not currently available in express-validator is that it supports applying validators and sanitizers to an array of values. This is very useful if you need to permit multiple values for a property, for example when accepting a form which includes a set of checkboxes or a search page which has multiple filters.

[express-validator]: https://express-validator.github.io/docs/


## Development

Guestlist follows the [Standard] code style, includes [TypeScript] declarations and is tested with [Jasmine].

[TypeScript]: https://www.typescriptlang.org/
[Standard]: https://standardjs.com/
[Jasmine]: http://jasmine.github.io/


## License

Guestlist is [MIT] licensed.

[MIT]: https://opensource.org/licenses/MIT
