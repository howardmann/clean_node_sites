let chai = require('chai');
let expect = chai.expect;
let {requiredParam, upperCase} = require('./index')

describe('helpers', () => {
  describe('requiredParam(value, property)', () => {
    it('throws error if value does not exist', async () => {
      let errorMessage = 'site cannot be null or undefined.'
      expect(() => {
        let site = null
        requiredParam(site, 'site')
      }).to.throw(errorMessage)
    })

    it('returns param if value does exists', async () => {
      let site = '123 Street'
      let input = requiredParam(site, 'site')
      let actual = '123 Street'
      expect(input).to.eql(actual)
    })
  })

  describe('upperCase(string)', () => {
    it('capitalizes a single word', async () => {
      let input = upperCase('robina')
      let actual = 'Robina'
      expect(input).to.eql(actual)
    })

    it('capitalizes sentences', async () => {
      let input = upperCase('robina town centre')
      let actual = 'Robina Town Centre'
      expect(input).to.eql(actual)
    })
  })
})