import { Rule } from './rule'
import patrol from './patrol'

export declare type Member = {
  location: string
  property: string
  rule: Rule
  options: Options
}

export interface Options {
  multiple?: boolean
  default?: any
}

export declare class Guard {
  list: Array<Member>

  permit(location: string, property: string, rule: Rule, options: Options): this

  body(property: string, rule: Rule, options: Options): this

  cookie(property: string, rule: Rule, options: Options): this

  param(property: string, rule: Rule, options: Options): this

  query(property: string, rule: Rule, options: Options): this

  secure(): patrol
}

declare const guard: (target: string) => Guard

export default guard
