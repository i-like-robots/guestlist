const { Rule, rule } = require('../')

const plusOne = (number) => number + 1

const subject = {
  a: rule().isInt({ min: 1, max: 100 }).toInt().customSanitizer(plusOne),
  b: rule().isLength({ min: 3 }).contains('!').trim().blacklist('!'),
  c: rule().isISO8601().isAfter('2000-01-01').toDate()
}

describe('Rule', () => {
  it('appends validators to list of validators', () => {
    expect(subject.a.validators.length).toEqual(1)
    expect(subject.b.validators.length).toEqual(2)
    expect(subject.c.validators.length).toEqual(2)
  })

  it('appends sanitizers to list of sanitizers', () => {
    expect(subject.a.sanitizers.length).toEqual(2)
    expect(subject.b.sanitizers.length).toEqual(2)
    expect(subject.c.sanitizers.length).toEqual(1)
  })

  describe('#validate', () => {
    it('checks a value against each validator', () => {
      expect(Rule.validate(subject.a, '1')).toEqual(true)
      expect(Rule.validate(subject.a, 'abc')).toEqual(false)
      expect(Rule.validate(subject.a, '101')).toEqual(false)

      expect(Rule.validate(subject.b, 'Hello World!')).toEqual(true)
      expect(Rule.validate(subject.b, 'Hello World')).toEqual(false)
      expect(Rule.validate(subject.b, '')).toEqual(false)

      expect(Rule.validate(subject.c, '2018-01-01')).toEqual(true)
      expect(Rule.validate(subject.c, '1999-01-01')).toEqual(false)
      expect(Rule.validate(subject.c, 'January 1, 2018')).toEqual(false)
    })
  })

  describe('#sanitize', () => {
    it('runs a value through each sanitizer', () => {
      expect(Rule.sanitize(subject.a, '1')).toEqual(2)
      expect(Rule.sanitize(subject.b, ' Hello World! ')).toEqual('Hello World')
      expect(Rule.sanitize(subject.c, '2018-01-01')).toEqual(jasmine.any(Date))
    })
  })
})
