import { Request, Response, NextFunction } from 'express'
import { Guard } from './guard'
import { Rule } from './rule'
import { single, multiple } from './util'

const INVALID = Symbol('INVALID')

// If the
const test = (value: string, rule: Rule) => (
  Rule.validate(rule, value) ? Rule.sanitize(rule, value) : INVALID
)

export default function (this: Guard, request: Request, response: Response, next: NextFunction): void {
  const whitelist = {}
  const parameters = request[this.property] || {}

  for (const [ parameter, { rule, options } ] of this.list) {
    if (parameters.hasOwnProperty(parameter)) {
      const raw = parameters[parameter]

      if (options.multiple) {
        const values = multiple(raw)
        const results = values.map((value) => test(value, rule))

        whitelist[parameter] = results.filter((result) => result !== INVALID)
      } else {
        const value = single(raw)
        const result = test(value, rule)

        if (result !== INVALID) {
          whitelist[parameter] = result
        }
      }
    }
  }

  request[this.property] = whitelist

  next()
}
