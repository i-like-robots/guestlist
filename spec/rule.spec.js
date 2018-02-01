const { Rule } = require('../')

const subject = {
  a: new Rule().isInt({ min: 1, max: 100 }).toInt(),
  b: new Rule().isLength({ min: 3 }).contains('!').trim().blacklist('!'),
  c: new Rule().isISO8601().isAfter('2000-01-01 00:00:00').toDate()
}

describe('Rule', () => {
  describe('#validate', () => {
    it('checks a value against the given rules', () => {
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
      expect(Rule.sanitize(subject.a, '1')).toEqual(1)
      expect(Rule.sanitize(subject.b, ' Hello World! ')).toEqual('Hello World')
      expect(Rule.sanitize(subject.c, '2018-01-01')).toEqual(jasmine.any(Date))
    })
  })
})
