import { Rule } from './rule'
import security from './security'

export type GuardTarget = 'query' | 'params' | 'body'

export class Guard {
  public target: GuardTarget
  private list: Map<string, Rule>

  constructor (target: GuardTarget) {
    if (typeof target !== 'string') {
      throw new TypeError('`target` must be a string')
    }

    this.target = target
    this.list = new Map()
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

  secure () {
    return security.bind(this)
  }
}

export default (target: GuardTarget) => new Guard(target)
