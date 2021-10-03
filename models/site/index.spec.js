let chai = require('chai');
let expect = chai.expect;
let makeSite = require('./index')

describe('makeSite', () => {
  it('throws error if name less than 2 characters', async() => {
    let errorMessage = 'Site name must be at least 2 characters long.'
    expect(() => {
      makeSite({
        name: 'a',
        state: 'NSW'
      })      
    }).to.throw(errorMessage)
  })

  it('throws error if state not AUS', async() => {
    let errorMessage = 'NZ state must be in Australia.'
    expect(() => {
      makeSite({
        name: '123 Smith Street',
        state: 'NZ'
      })      
    }).to.throw(errorMessage)
  })

  it('throws error if name missing', async() => {
    let errorMessage = 'name can not be null or undefined.'
    expect(() => {
      makeSite({
        state: 'NZ'
      })      
    }).to.throw(errorMessage)
  })

  it('throws error if state missing', async() => {
    let errorMessage = 'state can not be null or undefined.'
    expect(() => {
      makeSite({
        name: '123 Magic Street'
      })      
    }).to.throw(errorMessage)
  })

  it('normalises upperCase site name', async () => {
    let site = makeSite({
      name: '123 smith street',
      state: 'NSW'
    })
    let input = site.name
    let actual = '123 Smith Street'
    expect(input).to.eql(actual)
  })

  it('normalises capitalizes state', async () => {
    let site = makeSite({
      name: '123 smith street',
      state: 'nsw'
    })
    let input = site.state
    let actual = 'NSW'
    expect(input).to.eql(actual)
  })



})