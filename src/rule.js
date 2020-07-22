import validator from 'validator'

const validators = new Set([
  'contains',
  'equals',
  'isAfter',
  'isAlpha',
  'isAlphanumeric',
  'isAscii',
  'isBase64',
  'isBefore',
  'isBIC',
  'isBoolean',
  'isBtcAddress',
  'isByteLength',
  'isCreditCard',
  'isCurrency',
  'isDataURI',
  'isDate',
  'isDecimal',
  'isDivisibleBy',
  'isEAN',
  'isEmail',
  'isEmpty',
  'isEthereumAddress',
  'isFQDN',
  'isFloat',
  'isFullWidth',
  'isHalfWidth',
  'isHash',
  'isHexadecimal',
  'isHexColor',
  'isHSL',
  'isIBAN',
  'isIP',
  'isIPRange',
  'isISBN',
  'isISIN',
  'isISO31661Alpha2',
  'isISO31661Alpha3',
  'isISO8601',
  'isISRC',
  'isISSN',
  'isIdentityCard',
  'isIMEI',
  'isIn',
  'isInt',
  'isJSON',
  'isJWT',
  'isLatLong',
  'isLength',
  'isLocale',
  'isLowercase',
  'isMACAddress',
  'isMD5',
  'isMagnetURI',
  'isMimeType',
  'isMobilePhone',
  'isMongoId',
  'isMultibyte',
  'isNumeric',
  'isOctal',
  'isPassportNumber',
  'isPort',
  'isPostalCode',
  'isRFC3339',
  'isRgbColor',
  'isSemVer',
  'isSlug',
  'isSurrogatePair',
  'isTaxID',
  'isURL',
  'isUUID',
  'isUppercase',
  'isVariableWidth',
  'isWhitelisted',
  'matches'
])

const sanitizers = new Set([
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

  // iterate over each validator ensuring each is true
  static validate(instance, value) {
    return instance.validators.every(({ method, args }) =>
      Reflect.apply(method, null, [value, ...args])
    )
  }

  // iterate over each sanitizer, passing the new value to the next
  static sanitize(instance, value) {
    return instance.sanitizers.reduce((value, { method, args }) => {
      return Reflect.apply(method, null, [value, ...args])
    }, value)
  }

  customValidator(callback) {
    this.validators.push({ method: callback, args: [] })
    return this
  }

  customSanitizer(callback) {
    this.sanitizers.push({ method: callback, args: [] })
    return this
  }
}

// Append a proxy for each validator method
for (const method of validators) {
  if (validator.hasOwnProperty(method)) {
    Rule.prototype[method] = function (...args) {
      this.validators.push({ method: validator[method], args })
      return this
    }
  }
}

// Append a proxy for each sanitizer method
for (const method of sanitizers) {
  if (validator.hasOwnProperty(method)) {
    Rule.prototype[method] = function (...args) {
      this.sanitizers.push({ method: validator[method], args })
      return this
    }
  }
}

export default () => new Rule()
