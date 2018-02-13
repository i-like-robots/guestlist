import { Request, Response, NextFunction } from 'express'
import { Guard } from './guard'
import { Rule } from './rule'

// If the value is an array when it shouldn't be, take the last result
const single = (value): string => Array.isArray(value) ? value.slice(-1).pop() : value

// If the parameter is not an array when it should be, array-ify it
const multiple = (value): Array<string> => [].concat(value)

// If the
const test = (value: string, rule: Rule) => (
  Rule.validate(rule, value) ? Rule.sanitize(rule, value) : undefined
)

export default function (this: Guard, request: Request, response: Response, next: NextFunction): void {
  const whitelist = {}
  const parameters = request[this.property] || {}

  for (const [ parameter, { rule, options } ] of this.list) {
    const raw = parameters.hasOwnProperty(parameter) ? parameters[parameter] : null

    if (raw === null) {
      continue
    }

    if (options.multiple) {
      const values = multiple(raw)
      const results = values.map((value) => test(value, rule))

      whitelist[parameter] = results.filter((result) => result !== undefined)
    } else {
      const value = single(raw)
      const result = test(value, rule)

      whitelist[parameter] = result
    }
  }

  request[this.property] = whitelist

  next()
}
