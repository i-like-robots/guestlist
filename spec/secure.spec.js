const { Guard, Secure } = require('../')

const fixture = new Guard('body')

describe('Secure', () => {
  it('requires a guard', () => {
    expect(() => new Secure(fixture)).not.toThrowError()
    expect(() => new Secure()).toThrowError()
  })

  it('returns a new middleware function', () => {
    const result = new Secure(fixture)

    expect(result).toEqual(jasmine.any(Function))
    expect(result.length).toEqual(3)
  })
})
