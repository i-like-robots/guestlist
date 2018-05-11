import { Guard } from './guard'
import { Rule } from './rule'
import { single, multiple, extend, get } from './util'

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

    if (value !== undefined) {
      if (options.multiple) {
        const results = multiple(value).map((item) => test(item, rule))
        whitelist[location][property] = results.filter((result) => result !== undefined)
      } else {
        const result = test(single(value), rule)
        whitelist[location][property] = result
      }
    }
  }

  extend(request, whitelist)

  next()
}

export default patrol
