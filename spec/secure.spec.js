const { rule, guard, secure } = require('../')
const { createMocks } = require('node-mocks-http')

const fixture = guard()
  .query('term', rule().isLength({ min: 2 }).trim().escape())
  .query('page', rule().isInt({ min: 1, max: 100 }).toInt(), { default: 1 })
  .query('date', rule().isISO8601().toDate())
  .query('year', rule().isISO8601().toDate(), { callback: (date) => date.getFullYear() })
  .query('tags', rule().isInt().toInt(), { array: true })

const subject = secure(fixture)

const run = (query = {}) => {
  const { req, res } = createMocks({ query })
  const next = jasmine.createSpy('next')

  subject(req, res, next)

  return { req, res, next }
}

describe('Secure', () => {
  it('returns a new middleware function', () => {
    expect(subject).toEqual(jasmine.any(Function))
    expect(subject.length).toEqual(3)
  })

  it('calls the fallthrough function', () => {
    const { next } = run()

    expect(next).toHaveBeenCalled()
  })

  it('whitelists valid parameters', () => {
    const { req } = run({ term: 'Hello World', page: '5', date: '2018-01-01' })

    expect(req.query.term).toEqual('Hello World')
    expect(req.query.page).toEqual(5)
    expect(req.query.date).toEqual(jasmine.any(Date))
  })

  it('ignores invalid parameters', () => {
    const { req } = run({ term: '', date: 'January 1 2018' })

    expect(req.query.term).toBeUndefined()
    expect(req.query.date).toBeUndefined()
  })

  it('can return a default value', () => {
    const { req: a } = run()
    expect(a.query.page).toEqual(1)

    const { req: b } = run({ page: '101' })
    expect(b.query.page).toEqual(1)
  })

  it('can handle array values', () => {
    const { req: a } = run({ tags: ['123', '456'] })
    expect(a.query.tags).toEqual([ 123, 456 ])

    const { req: b } = run({ tags: '123' })
    expect(b.query.tags).toEqual([ 123 ])
  })

  it('can handle non-array values', () => {
    const { req } = run({ page: ['99', '99'] })
    expect(req.query.page).toEqual(99)
  })

  it('allows the resultant value to modified', () => {
    const { req } = run({ year: '2018-06-30' })
    expect(req.query.year).toEqual(2018)
  })
})
