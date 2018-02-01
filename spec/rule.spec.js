const { Rule } = require('../dist-cjs/core/rule')

const fixtures = {
  term: new Rule().trim().escape(),
  date: new Rule().isISO8601().toDate(),
  page: new Rule().isInt({ min: 1, max: 100 }).toInt()
}

describe('Rule', () => {
  it('can validate a value according to a rule', () => {
    expect(Rule.validate(fixtures.term, 'Hello World')).toEqual(true)

    expect(Rule.validate(fixtures.date, '2018-01-01')).toEqual(true)
    expect(Rule.validate(fixtures.date, 'January 1, 2018')).toEqual(false)

    expect(Rule.validate(fixtures.page, '1')).toEqual(true)
    expect(Rule.validate(fixtures.page, '101')).toEqual(false)
  })

  it('can sanitize a value according to a rule', () => {
    expect(Rule.sanitize(fixtures.term, '  Hello World  ')).toEqual('Hello World')
    expect(Rule.sanitize(fixtures.term, '" />')).toEqual('&quot; &#x2F;&gt;')

    expect(Rule.sanitize(fixtures.date, '2018-01-01')).toEqual(jasmine.any(Date))

    expect(Rule.sanitize(fixtures.page, '1')).toEqual(1)
  })
})
