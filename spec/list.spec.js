const { rule, list } = require('../')

const fixture = rule()

describe('List', () => {
  let instance

  beforeEach(() => {
    instance = list()
  })

  describe('#add', () => {
    it('requires a valid parameter name and a rule', () => {
      expect(() => instance.add('param', fixture)).not.toThrowError()
      expect(() => instance.add(null, fixture)).toThrowError()
    })

    it('appends valid members to the list', () => {
      instance.add('foo', fixture)
      instance.add('bar', fixture)

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
