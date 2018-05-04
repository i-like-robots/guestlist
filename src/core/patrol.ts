import { Request, Response, NextFunction } from 'express'
import { Guard } from './guard'
import { Rule } from './rule'
import { single, multiple } from './util'

const test = (value: string, rule: Rule) => (
  Rule.validate(rule, value) ? Rule.sanitize(rule, value) : undefined
)

export default function (this: Guard, request: Request, response: Response, next: NextFunction): void {
  const whitelist = {}

  for (const { location, property, rule, options } of this.list) {
    if (request[location] && request[location].hasOwnProperty(property)) {
      const raw = request[location][property]

      whitelist[location] = whitelist[location] || {}

      if (options.multiple) {
        const values = multiple(raw)
        const results = values.map((value) => test(value, rule))

        whitelist[location][property] = results.filter((result) => result !== undefined)
      } else {
        const value = single(raw)
        const result = test(value, rule)

        whitelist[location][property] = result
      }
    }
  }

  Object.assign(request, whitelist)

  next()
}
