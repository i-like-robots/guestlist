import { Request, Response, NextFunction } from 'express'
import { Guard } from './guard'
import { Rule } from './rule'

export default function (this: Guard, request: Request, response: Response, next: NextFunction): void {
  const whitelist = {}
  const parameters = request[this.property] || {}

  for (const [ parameter, rule ] of this.list) {
    const value = parameters.hasOwnProperty(parameter) ? parameters[parameter] : null

    if (value !== null && Rule.validate(rule, value)) {
      whitelist[parameter] = Rule.sanitize(rule, value)
    }
  }

  request[this.property] = whitelist

  next()
}
