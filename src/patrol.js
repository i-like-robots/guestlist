import { Rule } from './rule'
import { single, array, isDefined, extend, get } from './util'

const test = (value, rule) => {
  if (Rule.validate(rule, value)) {
    return Rule.sanitize(rule, value)
  }
}

function patrol(request, response, next) {
  const whitelist = {}

  for (const { location, property, rule, options } of this.list) {
    const value = get(request, location, property)

    if (!whitelist.hasOwnProperty(location)) {
      whitelist[location] = {}
    }

    let result

    if (value !== undefined) {
      if (options.array) {
        const subjects = array(value)
        result = subjects.map((subject) => test(subject, rule)).filter(isDefined)
      } else {
        const subject = single(value)
        result = test(subject, rule)
      }
    }

    whitelist[location][property] = isDefined(result) ? result : options.default
  }

  extend(request, whitelist)

  next()
}

export default patrol
