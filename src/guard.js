import { Rule } from './rule'
import { extend } from './util'

const DEFAULT_OPTIONS = {
  array: false,
  default: undefined,
  postprocess: (value) => value
}

const LOCATIONS = new Set(['body', 'cookies', 'params', 'query'])

export class Guard {
  constructor() {
    this.list = []
  }

  check(location, property, rule, options = {}) {
    if (typeof location !== 'string') {
      throw new TypeError('Expected location to be a of type "string"')
    }

    if (typeof property !== 'string') {
      throw new TypeError('Expected property to be a of type "string"')
    }

    if (rule instanceof Rule === false) {
      throw new TypeError('Expectedrule to be an instance of Rule')
    }

    if (!LOCATIONS.has(location)) {
      throw new TypeError(`Expected property location to be one of ${[...LOCATIONS]}`)
    }

    this.list.push({
      location,
      property,
      rule,
      options: extend({}, DEFAULT_OPTIONS, options)
    })

    return this
  }

  body(property, rule, options) {
    return this.check('body', property, rule, options)
  }

  cookie(property, rule, options) {
    return this.check('cookies', property, rule, options)
  }

  param(property, rule, options) {
    return this.check('params', property, rule, options)
  }

  query(property, rule, options) {
    return this.check('query', property, rule, options)
  }
}

export default () => new Guard()
