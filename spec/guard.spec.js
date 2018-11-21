const { rule, guard } = require('../')

const fixture = rule()

describe('Guard', () => {
  let instance

  beforeEach(() => {
    instance = guard()
  })

  describe('#permit', () => {
    it('requires a valid parameter name and a rule', () => {
      expect(() => instance.permit('param', fixture)).not.toThrowError()
      expect(() => instance.permit(null, fixture)).toThrowError()
    })

    it('appends valid members to the list', () => {
      instance.permit('foo', fixture)
      instance.permit('bar', fixture)

      expect(instance.list.length).toEqual(2)

      instance.list.forEach((item) => {
        const keys = Object.keys(item)

        expect(keys).toContain('property')
        expect(keys).toContain('rule')
        expect(keys).toContain('options')
      })
    })
  })
})
