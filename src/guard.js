import { Rule } from './rule'
import patrol from './patrol'
import { extend } from './util'

const DEFAULTS = {
  multiple: false,
  default: undefined
}

export class Guard {
  constructor() {
    this.list = []
  }

  permit(location, property, rule, options) {
    if (typeof location !== 'string') {
      throw new TypeError('Expected location to be a of type "string"')
    }

    if (typeof property !== 'string') {
      throw new TypeError('Expected `property` to be a of type "string"')
    }

    if (rule instanceof Rule === false) {
      throw new TypeError('Expected `rule` to be an instance of Rule')
    }

    this.list.push({
      location,
      property,
      rule,
      options: extend({}, DEFAULTS, options)
    })

    return this
  }

  body(property, rule, options) {
    return this.permit('body', property, rule, options)
  }

  cookie(property, rule, options) {
    return this.permit('cookies', property, rule, options)
  }

  param(property, rule, options) {
    return this.permit('params', property, rule, options)
  }

  query(property, rule, options) {
    return this.permit('query', property, rule, options)
  }

  secure() {
    return patrol.bind(this)
  }
}

export default (target) => new Guard()
