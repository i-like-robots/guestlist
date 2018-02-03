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

export type Criteria = Array<{ method: Function, args: Array<any> }>

export class Rule {
  public validators: Criteria = []
  public sanitizers: Criteria = []

  constructor () {
    Object.entries(validator).forEach(([ name, method ]) => {
      if (typeof method === 'function') {
        this[name] = (...args): this => {
          if (VALIDATORS.has(name)) {
            this.validators.push({ method, args })
          }

          if (SANITIZERS.has(name)) {
            this.sanitizers.push({ method, args })
          }

          return this
        }
      }
    })
  }

  static validate (instance: Rule, value: string): Boolean {
    return instance.validators.every(({ method, args }) => {
      return Reflect.apply(method, null, [ value, ...args ])
    })
  }

  static sanitize (instance: Rule, value: string): any {
    return instance.sanitizers.reduce((value, { method, args }) => (
      Reflect.apply(method, null, [ value, ...args ])
    ), value)
  }
}

export default (): Rule => new Rule()
