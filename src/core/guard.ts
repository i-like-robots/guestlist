import { Rule } from './rule'

export type ListMember = { rule: Rule, options: MemberOptions }

export interface MemberOptions { multiple?: boolean }

const DEFAULT_OPTIONS: MemberOptions = {
  multiple: false
}

export class Guard {
  public property: string
  public list: Map<string, ListMember> = new Map()

  constructor (property: string) {
    if (typeof property !== 'string') {
      throw new TypeError('`property` must be a string')
    }

    this.property = property
  }

  permit (parameter: string, rule: Rule, options: MemberOptions = {}): this {
    if (typeof parameter !== 'string') {
      throw new TypeError('`parameter` must be a "string"')
    }

    if (rule instanceof Rule === false) {
      throw new TypeError('`rule` must be an instance of Rule')
    }

    this.list.set(parameter, { rule, options: Object.assign({}, DEFAULT_OPTIONS, options) })

    return this
  }
}

export default (target: string): Guard => new Guard(target)
