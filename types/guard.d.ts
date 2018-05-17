import { Rule } from './rule'
import patrol from './patrol'

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

  private permit(location: Location, property: string, rule: Rule, options: Options): this

  body(property: string, rule: Rule, options: Options): this

  cookie(property: string, rule: Rule, options: Options): this

  param(property: string, rule: Rule, options: Options): this

  query(property: string, rule: Rule, options: Options): this

  secure(): patrol
}

declare const guard: (target: string) => Guard

export default guard
