let chai = require('chai');
let expect = chai.expect;
let makeGroup = require('./index')

describe('makeGroup', () => {
  it('throws error if name missing', async () => {
    let errorMessage = 'name cannot be null or undefined.'
    expect(() => {
      makeGroup({name: null})
    }).to.throw(errorMessage)
  })

  it('normalises upperCase name', async () => {
    let group = makeGroup({
      name: 'mirvac'
    })
    let input = group.name
    let actual = 'Mirvac'
    expect(input).to.eql(actual)
  })

})