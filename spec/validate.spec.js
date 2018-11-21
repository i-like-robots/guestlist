const { rule, guard, validate } = require('../')
const { createMocks } = require('node-mocks-http')

const safelist = guard()
  .permit('term', rule().isLength({ min: 2 }).trim().escape())
  .permit('page', rule().isInt({ min: 1, max: 100 }).toInt(), { default: 1 })
  .permit('date', rule().isISO8601().toDate())
  .permit('year', rule().isISO8601().toDate().customSanitizer((date) => date.getFullYear()))
  .permit('tags', rule().isInt().toInt(), { array: true })

const run = (query = {}) => {
  const mocks = createMocks({ query })
  return validate(mocks.req, safelist)
}

describe('Validate', () => {
  it('whitelists valid parameters', () => {
    const result = run({ term: 'Hello World', page: '5', date: '2018-01-01' })

    expect(result.term).toEqual('Hello World')
    expect(result.page).toEqual(5)
    expect(result.date).toEqual(jasmine.any(Date))
  })

  it('ignores invalid parameters', () => {
    const result = run({ term: '', date: 'January 1 2018' })

    expect(result.term).toBeUndefined()
    expect(result.date).toBeUndefined()
  })

  it('can return a default value when not defined or invalid ', () => {
    const a = run()
    expect(a.page).toEqual(1)

    const b = run({ page: '101' })
    expect(b.page).toEqual(1)
  })

  it('can handle an array values', () => {
    const a = run({ tags: ['123', '456'] })
    expect(a.tags).toEqual([ 123, 456 ])

    const b = run({ tags: '123' })
    expect(b.tags).toEqual([ 123 ])
  })

  it('can handle non-array values', () => {
    const result = run({ page: ['99', '99'] })
    expect(result.page).toEqual(99)
  })

  it('allows the resultant value to modified', () => {
    const result = run({ year: '2018-06-30' })
    expect(result.year).toEqual(2018)
  })
})
