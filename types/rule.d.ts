import validator from 'validator'

export declare type Criterion = {
  method: Function
  args: Array<any>
}

declare type IdentityCardLocale = 'any' | 'ES'

export declare class Rule {
  validators: Array<Criterion>
  sanitizers: Array<Criterion>

  static validate(instance: Rule, value: string): Boolean

  static sanitize(instance: Rule, value: string): any

  // **************
  // * Validators *
  // **************

  // check if the string contains the seed.
  contains(elem: any): this

  // check if the string matches the comparison.
  equals(comparison: string): this

  // check if the string is a date that's after the specified date (defaults to now).
  isAfter(date?: string): this

  // check if the string contains only letters (a-zA-Z). Locale is one of ['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG',
  // 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE',
  // 'bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM',
  // 'es-ES', 'fr-FR', 'hu-HU', 'it-IT', 'nb-NO', 'nl-NL', 'nn-NO', 'pl-PL', 'pt-BR', 'pt-PT', 'ru-RU', 'sk-SK', 'sr-RS',
  // 'sr-RS@latin', 'sv-SE', 'tr-TR', 'uk-UA']) and defaults to en-US
  isAlpha(locale?: ValidatorJS.AlphaLocale): this

  // check if the string contains only letters and numbers. Locale is one of ['ar', 'ar-AE', 'ar-BH', 'ar-DZ', 'ar-EG',
  // 'ar-IQ', 'ar-JO', 'ar-KW', 'ar-LB', 'ar-LY', 'ar-MA', 'ar-QA', 'ar-QM', 'ar-SA', 'ar-SD', 'ar-SY', 'ar-TN', 'ar-YE',
  // 'bg-BG', 'cs-CZ', 'da-DK', 'de-DE', 'el-GR', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-NZ', 'en-US', 'en-ZA', 'en-ZM',
  // 'es-ES', 'fr-FR', 'hu-HU', 'it-IT', 'nb-NO', 'nl-NL', 'nn-NO', 'pl-PL', 'pt-BR', 'pt-PT', 'ru-RU', 'sk-SK', 'sr-RS',
  // 'sr-RS@latin', 'sv-SE', 'tr-TR', 'uk-UA']) and defaults to en-US
  isAlphanumeric(locale?: ValidatorJS.AlphanumericLocale): this

  // check if the string contains ASCII chars only.
  isAscii(): this

  // check if a string is base32 encoded.
  isBase32(): this

  // check if a string is base64 encoded.
  isBase64(): this

  // check if the string is a date that's before the specified date.
  isBefore(date?: string): this

  // check if a string is a boolean.
  isBoolean(): this

  // check if the string's length (in bytes) falls in a range.
  isByteLength(options: ValidatorJS.IsByteLengthOptions): this
  isByteLength(min: number, max?: number): this

  // check if the string is a credit card.
  isCreditCard(): this

  // check if the string is a valid currency amount.
  isCurrency(options?: ValidatorJS.IsCurrencyOptions): this

  // check if the string is a data uri format (https://developer.mozilla.org/en-US/docs/Web/HTTP/data_URIs)
  isDataURI(): this

  // check if the string is a magnet uri format (https://en.wikipedia.org/wiki/Magnet_URI_scheme).
  isMagnetURI(): this

  // check if the string represents a decimal number, such as 0.1, .3, 1.1, 1.00003, 4.0, etc.
  isDecimal(options?: ValidatorJS.IsDecimalOptions): this

  // check if the string is a number that's divisible by another.
  isDivisibleBy(number: number): this

  // check if the string is an email.
  isEmail(options?: ValidatorJS.IsEmailOptions): this

  // check if the string has a length of zero.
  isEmpty(): this

  // check if the string is a fully qualified domain name (e.g. domain.com).
  isFQDN(options?: ValidatorJS.IsFQDNOptions): this

  // check if the string is a float.
  isFloat(options?: ValidatorJS.IsFloatOptions): this

  // check if the string contains any full-width chars.
  isFullWidth(): this

  // check if the string contains any half-width chars.
  isHalfWidth(): this

  // check if the string is a hash of type algorithm.
  // Algorithm is one of ['md4', 'md5', 'sha1', 'sha256', 'sha384', 'sha512', 'ripemd128', 'ripemd160', 'tiger128',
  // 'tiger160', 'tiger192', 'crc32', 'crc32b']
  isHash(algorithm: ValidatorJS.HashAlgorithm): this

  // check if the string is a hexadecimal color.
  isHexColor(): this

  // check if the string is a hexadecimal number.
  isHexadecimal(): this

  // check if the string is a valid identity card code.
  isIdentityCard(locale?: IdentityCardLocale): this

  // check if the string is an IP (version 4 or 6).
  isIP(version?: number): this

  // check if the string is an IP Range(version 4 only).
  isIPRange(): this

  // check if the string is an ISBN (version 10 or 13).
  isISBN(version?: number): this

  // check if the string is an ISSN (https://en.wikipedia.org/wiki/International_Standard_Serial_Number).
  isISSN(options?: ValidatorJS.IsISSNOptions): this

  // check if the string is an ISIN (https://en.wikipedia.org/wiki/International_Securities_Identification_Number)
  // (stock/security identifier).
  isISIN(): this

  // check if the string is a valid ISO 8601 (https://en.wikipedia.org/wiki/ISO_8601) date.
  isISO8601(options?: ValidatorJS.IsISO8601Options): this

  // check if the string is a valid RFC 3339 date (https://tools.ietf.org/html/rfc3339).
  isRFC3339(): this

  // check if the string is a valid ISO 3166-1 alpha-2 (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) officially assigned
  // country code.
  isISO31661Alpha2(): this

  // check if the string is a valid ISO 3166-1 alpha-3 (https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3) officially assigned
  // country code.
  isISO31661Alpha3(): this

  // check if the string is a ISRC (https://en.wikipedia.org/wiki/International_Standard_Recording_Code).
  isISRC(): this

  // check if the string is in a array of allowed values.
  isIn(values: any[]): this

  // check if the string is an integer.
  isInt(options?: ValidatorJS.IsIntOptions): this

  // check if the string is valid JSON (note: uses JSON.parse).
  isJSON(): this

  // check if the string is valid JWT token.
  isJWT(): this

  // check if the string is a valid latitude-longitude coordinate in the format lat,long or lat, long.
  isLatLong(): this

  // check if the string's length falls in a range.
  // Note: this function takes into account surrogate pairs.
  isLength(options: ValidatorJS.IsLengthOptions): this
  isLength(min: number, max?: number): this

  // check if the string is lowercase.
  isLowercase(): this

  // check if the string is a MAC address.
  isMACAddress(): this

  // check if the string is a MD5 hash.
  isMD5(): this

  // check if the string matches to a valid MIME type (https://en.wikipedia.org/wiki/Media_type) format
  isMimeType(): this

  // check if the string is a mobile phone number, (locale is one of
  // ['ar-AE', ar-DZ', 'ar-EG', 'ar-JO', 'ar-SA', 'ar-SY', 'be-BY', 'bg-BG', 'cs-CZ', 'de-DE',
  // 'da-DK', 'el-GR', 'en-AU', 'en-GB', 'en-HK', 'en-IN', 'en-KE', 'en-NG', 'en-NZ', 'en-UG',
  // 'en-RW', 'en-SG', 'en-TZ', 'en-PK', 'en-US', 'en-CA', 'en-ZA', 'en-ZM', 'es-ES', 'fa-IR',
  // 'fi-FI', 'fo-FO', 'fr-FR', 'he-IL', 'hu-HU', 'id-ID', 'it-IT', 'ja-JP', 'kk-KZ', 'kl-GL',
  // 'ko-KR', 'lt-LT', 'ms-MY', 'nb-NO', 'nn-NO', 'pl-PL', 'pt-PT', 'ro-RO', 'ru-RU', 'sk-SK',
  // 'sr-RS', 'th-TH', 'tr-TR', 'uk-UA', 'vi-VN', 'zh-CN', 'zh-HK', 'zh-TW']).
  isMobilePhone(
    locale: ValidatorJS.MobilePhoneLocale,
    options?: ValidatorJS.IsMobilePhoneOptions
  ): this

  // check if the string is a valid hex-encoded representation of a MongoDB ObjectId
  // (http://docs.mongodb.org/manual/reference/object-id/).
  isMongoId(): this

  // check if the string contains one or more multibyte chars.
  isMultibyte(): this

  // check if the string contains only numbers.
  isNumeric(options?: ValidatorJS.IsNumericOptions): this

  // check if the string is a valid port number.
  isPort(): this

  // check if the string is a postal code, (locale is one of
  // [ 'AT', 'AU', 'BE', 'BG', 'CA', 'CH', 'CZ', 'DE', 'DK', 'DZ', 'ES', 'FI', 'FR', 'GB', 'GR',
  // 'IL', 'IN', 'IS', 'IT', 'JP', 'KE', 'LI', 'MX', 'NL', 'NO', 'PL', 'PT', 'RO', 'RU', 'SA',
  // 'SE', 'TW', 'US', 'ZA', 'ZM' ]) OR 'any'. If 'any' is used, function will check if any of the
  // locales match).
  isPostalCode(locale: ValidatorJS.PostalCodeLocale): this

  // check if the string contains any surrogate pairs chars.
  isSurrogatePair(): this

  // check if the string is an URL.
  isURL(options?: ValidatorJS.IsURLOptions): this

  // check if the string is a UUID. Must be one of ['3', '4', '5', 'all'], default is all.
  isUUID(version?: 3 | 4 | 5 | '3' | '4' | '5' | 'all'): this

  // check if the string is uppercase.
  isUppercase(): this

  // check if the string contains a mixture of full and half-width chars.
  isVariableWidth(): this

  // checks characters if they appear in the whitelist.
  isWhitelisted(chars: string | string[]): this

  // check if string matches the pattern.
  matches(pattern: RegExp | string, modifiers?: string): this

  // **************
  // * Sanitizers *
  // **************

  // remove characters that appear in the blacklist. The characters are used in a RegExp and so you will need
  // to escape some chars, e.g. blacklist(input, '\\[\\]').
  blacklist(chars: string): this

  // replace <, >, &, ', " and / with HTML entities.
  escape(): this

  // replaces HTML encoded entities with <, >, &, ', " and /.
  unescape(): this

  // trim characters from the left-side of the input.
  ltrim(chars?: string): this

  // canonicalize an email address.
  normalizeEmail(email: string, options?: ValidatorJS.NormalizeEmailOptions): this

  // trim characters from the right-side of the input.
  rtrim(chars?: string): this

  // remove characters with a numerical value < 32 and 127, mostly control characters. If keep_new_lines is true,
  // newline characters are preserved (\n and \r, hex 0xA and 0xD). Unicode-safe in JavaScript.
  stripLow(keep_new_lines?: boolean): this

  // convert the input to a boolean. Everything except for '0', 'false' and '' returns true. In strict mode only '1'
  // and 'true' return true.
  toBoolean(strict?: boolean): this

  // convert the input to a date, or null if the input is not a date.
  toDate(): this

  // convert the input to a float, or NaN if the input is not a float.
  toFloat(): this

  // convert the input to an integer, or NaN if the input is not an integer.
  toInt(radix?: number): this // number or NaN

  // trim characters (whitespace by default) from both sides of the input.
  trim(chars?: string): this

  // remove characters that do not appear in the whitelist. The characters are used in a RegExp and so you will
  // need to escape some chars, e.g. whitelist(input, '\\[\\]').
  whitelist(chars: string): this
}

declare const rule: () => Rule

export default rule
