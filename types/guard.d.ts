import { Rule } from './rule'

export declare type Member = {
  location: string
  property: string
  rule: Rule
  options: Options
}

export interface Options {
  array?: boolean
  default?: any
}

export type Location = 'body' | 'cookies' | 'params' | 'query'

export declare class Guard {
  private list: Array<Member>

  private check(location: Location, prop: string, rule: Rule, options: Options): this

  body(property: string, rule: Rule, options?: Options): this

  cookie(property: string, rule: Rule, options?: Options): this

  param(property: string, rule: Rule, options?: Options): this

  query(property: string, rule: Rule, options?: Options): this
}

declare const guard: () => Guard

export default guard
