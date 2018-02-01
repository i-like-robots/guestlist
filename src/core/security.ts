import { Request, Response, NextFunction } from '../../node_modules/@types/express/index'
import { Rule } from './rule'

export default function (request: Request, response: Response, next: NextFunction): void {
  const whitelist = {}
  const target = request[this.target] || {}

  for (const [ parameter, rule ] of this.list) {
    const value = target.hasOwnProperty(parameter) ? target[parameter] : null

    if (value !== null && Rule.validate(rule, value)) {
      whitelist[parameter] = Rule.sanitize(rule, value)
    }
  }

  request[this.target] = whitelist

  next()
}
