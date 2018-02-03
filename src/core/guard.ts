import { Rule } from './rule'

export class Guard {
  public property: string
  public list: Map<string, Rule> = new Map()

  constructor (property: string) {
    if (typeof property !== 'string') {
      throw new TypeError('`property` must be a string')
    }

    this.property = property
  }

  permit (parameter: string, rule: Rule): this {
    if (typeof parameter !== 'string') {
      throw new TypeError('`parameter` must be a "string"')
    }

    if (rule instanceof Rule === false) {
      throw new TypeError('`rule` must be an instance of Rule')
    }

    this.list.set(parameter, rule)

    return this
  }
}

export default (target: string): Guard => new Guard(target)
