let chai = require('chai');
let expect = chai.expect;
let makeUser = require('./index')
const bcrypt = require('bcrypt')

describe('makeUser', () => {
  it('returns normalised user', async () => {
    let userInfo = {
      email: 'howie@email.com',
      password: 'chicken',
      admin: true
    }

    let newUser = makeUser(userInfo)
    expect(newUser.email).to.eql(userInfo.email)
    expect(newUser.admin).to.eql(true)
    let input = bcrypt.compareSync(userInfo.password, newUser.passwordHash)
    let actual = true
    expect(input).to.eql(actual)

  })


  it('throws error if not a valid email', async () => {
    let errorMessage = 'not a valid email.'
    expect(() => {
      makeUser({
        email: 'a',
        password: 'chicken'
      })
    }).to.throw(errorMessage)
  })

  it('throws error if password too short', async () => {
    let errorMessage = 'password must be at least 6 characters'
    expect(() => {
      makeUser({
        email: 'howie@email.com',
        password: 'chick'
      })
    }).to.throw(errorMessage)
  })

  it('throws error if admin not boolean', async () => {
    let errorMessage = 'admin must be boolean'
    expect(() => {
      makeUser({
        email: 'howie@email.com',
        password: 'chicken',
        admin: '123'
      })
    }).to.throw(errorMessage)
  })

  it('defaults admin to false', async () => {
    let userInfo = {
      email: 'howie@email.com',
      password: 'chicken'
    }

    let {admin} = makeUser(userInfo)
    let input = admin
    let actual = false
    expect(input).to.eql(actual)
  })

  it('returns hashed password', async () => {
    let userInfo = {
      email: 'howie@email.com',
      password: 'chicken'
    }

    let newUser = makeUser(userInfo)
    let input = bcrypt.compareSync(userInfo.password, newUser.passwordHash)
    let actual = true
    expect(input).to.eql(actual)
  })



})