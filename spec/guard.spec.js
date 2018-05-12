const { Rule, Guard } = require('../')

const fixture = new Rule()

describe('Guard', () => {
  let instance

  beforeEach(() => {
    instance = new Guard()
  })

  describe('#permit', () => {
    it('requires a valid location, parameter, and a rule', () => {
      expect(() => instance.permit('body', 'param', fixture)).not.toThrowError()
      expect(() => instance.permit('body', null, fixture)).toThrowError()
      expect(() => instance.permit(null, 'param', fixture)).toThrowError()
    })

    it('appends valid members to the list', () => {
      instance.permit('body', 'foo', fixture)
      instance.permit('body', 'bar', fixture)

      expect(instance.list.length).toEqual(2)

      instance.list.forEach((item) => {
        const keys = Object.keys(item)

        expect(keys).toContain('location')
        expect(keys).toContain('property')
        expect(keys).toContain('rule')
        expect(keys).toContain('options')
      })
    })
  })

  describe('#body', () => {
    it('appends a member to the list checking the body location', () => {
      instance.body('foo', fixture)

      const result = instance.list.find(({ location, property }) => {
        return location === 'body' && property === 'foo'
      })

      expect(result).toBeTruthy()
    })
  })

  describe('#cookie', () => {
    it('appends a member to the list checking the cookies location', () => {
      instance.cookie('bar', fixture)

      const result = instance.list.find(({ location, property }) => {
        return location === 'cookies' && property === 'bar'
      })

      expect(result).toBeTruthy()
    })
  })

  describe('#param', () => {
    it('appends a member to the list checking the params location', () => {
      instance.param('baz', fixture)

      const result = instance.list.find(({ location, property }) => {
        return location === 'params' && property === 'baz'
      })

      expect(result).toBeTruthy()
    })
  })

  describe('#query', () => {
    it('appends a member to the list checking the query location', () => {
      instance.query('qux', fixture)

      const result = instance.list.find(({ location, property }) => {
        return location === 'query' && property === 'qux'
      })

      expect(result).toBeTruthy()
    })
  })

  describe('#secure', () => {
    it('returns a new middleware function', () => {
      const result = instance.secure()

      expect(result).toEqual(jasmine.any(Function))
      expect(result.length).toEqual(3)
    })
  })
})
