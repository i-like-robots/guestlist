const { Rule, Guard } = require('../')
const { createMocks } = require('node-mocks-http')

const fixture = new Guard()
  .query('term', new Rule().isLength({ min: 2 }).trim().escape())
  .query('page', new Rule().isInt({ min: 1, max: 100 }).toInt())
  .query('date', new Rule().isISO8601().toDate())
  .query('tags', new Rule().isInt().toInt(), { multiple: true })

const subject = fixture.secure()

const run = (query = {}) => {
  const { req, res } = createMocks({ query })
  const next = jasmine.createSpy('next')

  subject(req, res, next)

  return { req, res, next }
}

describe('Patrol', () => {
  it('calls the fallthrough function', () => {
    const { next } = run()

    expect(next).toHaveBeenCalled()
  })

  it('whitelists valid parameters', () => {
    const { req } = run({ term: 'Hello World', page: '1', date: '2018-01-01' })

    expect(req.query.term).toEqual('Hello World')
    expect(req.query.page).toEqual(1)
    expect(req.query.date).toEqual(jasmine.any(Date))
  })

  it('ignores invalid parameters', () => {
    const { req } = run({ term: '', page: '101', date: 'January 1 2018' })

    expect(req.query.term).toBeUndefined()
    expect(req.query.page).toBeUndefined()
    expect(req.query.date).toBeUndefined()
  })

  it('can handle multiple values', () => {
    const { req: a } = run({ tags: ['123', '456'] })
    expect(a.query.tags).toEqual([ 123, 456 ])

    const { req: b } = run({ tags: '123' })
    expect(b.query.tags).toEqual([ 123 ])
  })

  it('can handle non-multiple values', () => {
    const { req } = run({ page: ['99', '99'] })
    expect(req.query.page).toEqual(99)
  })
})
