import { Request, Response, NextFunction } from '../../node_modules/@types/express/index'
import { Rule } from './rule'

export default function patrol (request: Request, response: Response, next: NextFunction): void {
  const whitelist = {}
  const parameters = request[this.property] || {}

  for (const [ param, rule ] of this.list) {
    const value = parameters.hasOwnProperty(param) ? parameters[param] : null

    if (value !== null && Rule.validate(rule, value)) {
      whitelist[param] = Rule.sanitize(rule, value)
    }
  }

  request[this.property] = whitelist

  next()
}
