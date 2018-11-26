import { Rule } from './rule'

export declare type Member = {
  property: string
  rule: Rule
  options: Options
}

export interface Options {
  array?: boolean
  default?: any
}

export declare class List {
  private list: Array<Member>

  private add(prop: string, rule: Rule, options?: Options): this
}

declare const list: () => List

export default list
