import validator from 'validator'

const VALIDATORS = new Set([
  'contains',
  'equals',
  'isAfter',
  'isAlpha',
  'isAlphanumeric',
  'isAscii',
  'isBase64',
  'isBefore',
  'isBoolean',
  'isByteLength',
  'isCreditCard',
  'isCurrency',
  'isDataURI',
  'isDecimal',
  'isDivisibleBy',
  'isEmail',
  'isEmpty',
  'isFQDN',
  'isFloat',
  'isFullWidth',
  'isHalfWidth',
  'isHash',
  'isHexColor',
  'isHexadecimal',
  'isIP',
  'isISBN',
  'isISIN',
  'isISO31661Alpha2',
  'isISO8601',
  'isISRC',
  'isISSN',
  'isIn',
  'isInt',
  'isJSON',
  'isLatLong',
  'isLength',
  'isLowercase',
  'isMACAddress',
  'isMD5',
  'isMimeType',
  'isMobilePhone',
  'isMongoId',
  'isMultibyte',
  'isNumeric',
  'isPort',
  'isPostalCode',
  'isSurrogatePair',
  'isURL',
  'isUUID',
  'isUppercase',
  'isVariableWidth',
  'isWhitelisted',
  'matches'
])

const SANITIZERS = new Set([
  'blacklist',
  'escape',
  'ltrim',
  'normalizeEmail',
  'rtrim',
  'stripLow',
  'toBoolean',
  'toDate',
  'toFloat',
  'toInt',
  'toString',
  'trim',
  'unescape',
  'whitelist'
])

export class Rule {
  constructor() {
    this.validators = []
    this.sanitizers = []
  }

  static validate(instance, value) {
    return instance.validators.every(({ method, args }) =>
      Reflect.apply(validator[method], null, [value, ...args])
    )
  }

  static sanitize(instance, value) {
    return instance.sanitizers.reduce((value, { method, args }) => {
      return Reflect.apply(validator[method], null, [value, ...args])
    }, value)
  }
}

for (const method of VALIDATORS) {
  if (validator.hasOwnProperty(method)) {
    Rule.prototype[method] = function(...args) {
      this.validators.push({ method, args })
      return this
    }
  }
}

for (const method of SANITIZERS) {
  if (validator.hasOwnProperty(method)) {
    Rule.prototype[method] = function(...args) {
      this.sanitizers.push({ method, args })
      return this
    }
  }
}

export default () => new Rule()
