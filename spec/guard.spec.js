const { Rule, Guard } = require('../')

const fixture = new Rule()

describe('Guard', () => {
  it('requires a target property', () => {
    expect(() => new Guard('body')).not.toThrowError()
    expect(() => new Guard()).toThrowError()
  })

  describe('#permit', () => {
    let instance

    beforeEach(() => {
      instance = new Guard('query')
    })

    it('requires a parameter and a rule', () => {
      expect(() => instance.permit('param', fixture)).not.toThrowError()
      expect(() => instance.permit('param')).toThrowError()
      expect(() => instance.permit(null, fixture)).toThrowError()
    })

    it('appends each rule to the list', () => {
      instance.permit('a', fixture)
      instance.permit('b', fixture)

      expect(instance.list.has('a')).toEqual(true)
      expect(instance.list.has('b')).toEqual(true)
    })
  })
})
