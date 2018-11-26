import { Rule } from './rule'
import { single, array, isDefined, find } from './util'

const defaultLocations = ['body', 'params', 'query', 'cookies']

const test = (value, rule) => {
  if (Rule.validate(rule, value)) {
    return Rule.sanitize(rule, value)
  }
}

export default function validate(request, safelist, locations = defaultLocations) {
  const whitelist = {}

  for (const { property, rule, options } of safelist.list) {
    const value = find(request, property, locations)

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

    if (isDefined(result)) {
      whitelist[property] = result
    } else if (isDefined(options.default)) {
      whitelist[property] = options.default
    }
  }

  return whitelist
}
