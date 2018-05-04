import { Rule } from './rule'

export type Member = {
  location: string,
  property: string,
  rule: Rule,
  options: Options
}

export interface Options {
  multiple?: boolean
}

const DEFAULTS: Options = {
  multiple: false
}

export class Guard {
  public list: Array<Member> = []

  permit (location: string, property: string, rule: Rule, options: Options): this {
    if (typeof location !== 'string') {
      throw new TypeError('`location` must be a "string"')
    }

    if (typeof property !== 'string') {
      throw new TypeError('`property` must be a "string"')
    }

    if (rule instanceof Rule === false) {
      throw new TypeError('`rule` must be an instance of Rule')
    }

    this.list.push({
      location,
      property,
      rule,
      options: Object.assign({}, DEFAULTS, options)
    })

    return this
  }

  body (property: string, rule: Rule, options: Options): this {
    return this.permit('body', property, rule, options)
  }

  cookie (property: string, rule: Rule, options: Options): this {
    return this.permit('cookies', property, rule, options)
  }

  param (property: string, rule: Rule, options: Options): this {
    return this.permit('params', property, rule, options)
  }

  query (property: string, rule: Rule, options: Options): this {
    return this.permit('query', property, rule, options)
  }
}

export default (target: string): Guard => new Guard()
