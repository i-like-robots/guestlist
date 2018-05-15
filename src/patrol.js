import { Rule } from './rule'
import { single, multiple, extend, get } from './util'

const test = (value, rule) => {
  if (Rule.validate(rule, value)) {
    return Rule.sanitize(rule, value)
  }
}

const notEmpty = (value) => value !== undefined

function patrol(request, response, next) {
  const whitelist = {}

  for (const { location, property, rule, options } of this.list) {
    const value = get(request, location, property)

    if (!whitelist.hasOwnProperty(location)) {
      whitelist[location] = {}
    }

    let result

    if (value !== undefined) {
      if (options.multiple) {
        const subjects = multiple(value)
        result = subjects.map((subject) => test(subject, rule)).filter(notEmpty)
      } else {
        const subject = single(value)
        result = test(subject, rule)
      }
    }

    whitelist[location][property] = notEmpty(result) ? result : options.default
  }

  extend(request, whitelist)

  next()
}

export default patrol
