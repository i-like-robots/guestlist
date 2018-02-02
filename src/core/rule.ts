import validator from 'validator'

const validators = [
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
]

const sanitizers = [
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
]

function methodFactory (type: string, method: string, ...args: Array<any>) {
  this[type].push({ method, args })
  return this
}

export class Rule {
  private validators: Array<{ method: string, args: Array<any> }>
  private sanitizers: Array<{ method: string, args: Array<any> }>

  constructor () {
    this.validators = []
    this.sanitizers = []

    validators.forEach((method) => {
      this[method] = methodFactory.bind(this, 'validators', method)
    })

    sanitizers.forEach((method) => {
      this[method] = methodFactory.bind(this, 'sanitizers', method)
    })
  }

  static validate (instance: Rule, value: any): Boolean {
    let valid = true

    for (const { method, args } of instance.validators) {
      valid = Reflect.apply(validator[method], null, [ value, ...args ])

      if (!valid) {
        break
      }
    }

    return valid
  }

  static sanitize (instance: Rule, value: any): any {
    return instance.sanitizers.reduce((value, { method, args }) => (
      Reflect.apply(validator[method], null, [ value, ...args ])
    ), value)
  }
}

export default (): Rule => new Rule()
