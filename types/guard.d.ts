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

export declare class Guard {
  private list: Array<Member>

  private permit(prop: string, rule: Rule, options: Options): this
}

declare const guard: () => Guard

export default guard
