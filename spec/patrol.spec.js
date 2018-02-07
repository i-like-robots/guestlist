const { Rule, Guard, Secure } = require('../')
const { createMocks } = require('node-mocks-http')

const fixture = new Guard('query')
  .permit('term', new Rule().isLength({ min: 2 }).trim().escape())
  .permit('page', new Rule().isInt({ min: 1, max: 100 }).toInt())
  .permit('date', new Rule().isISO8601().toDate())

const subject = new Secure(fixture)

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
    const { req, res, next } = run({ term: 'Hello World', page: '1', date: '2018-01-01' })

    expect(req.query.term).toEqual('Hello World')
    expect(req.query.page).toEqual(1)
    expect(req.query.date).toEqual(jasmine.any(Date))
  })

  it('ignores invalid parameters', () => {
    const { req, res, next } = run({ term: '', page: '101', date: 'January 1 2018' })

    expect(req.query.term).toBeUndefined()
    expect(req.query.page).toBeUndefined()
    expect(req.query.date).toBeUndefined()
  })
})
