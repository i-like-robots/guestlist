import { Rule } from './rule'

const defaultOptions = {
  array: false,
  default: undefined
}

export class Guard {
  constructor() {
    this.list = []
  }

  permit(property, rule, userOptions = {}) {
    if (typeof property !== 'string') {
      throw new TypeError('Expected property to be a of type "string"')
    }

    if (rule instanceof Rule === false) {
      throw new TypeError('Expected rule to be an instance of Rule')
    }

    this.list.push({
      property,
      rule,
      options: { ...defaultOptions, ...userOptions }
    })

    return this
  }
}

export default () => new Guard()
