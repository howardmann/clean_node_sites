let chai = require('chai');
let expect = chai.expect;
let usersDb = require('./index')
let USERS = require('../../db/memory/users') // csv seeder
let bcrypt = require('bcrypt')

describe('usersDb', () => {
  beforeEach(async () => {
    // Seed sites
    await usersDb.dropAll();
    // when using async await in map must wrap in Promise.all
    await Promise.all(USERS.map(async el => {
      let {email, admin} = el
      let newUser = await usersDb.createUser({
        email,
        password: 'chicken',
        admin
      })
      return newUser
    }))
  })

  it('dropAll() drops database', async () => {
    await usersDb.dropAll()
    let users = await usersDb.listUsers()
    let input = users.length
    let actual = 0
    expect(input).to.equal(actual)
  })

  it('listUsers() lists users', async () => {
    let input = await usersDb.listUsers()
    let actual = 2
    expect(input.length).to.equal(actual)
  })

  it('findUserBy(prop, val) find first user by prop val pair', async () => {
    let user = await usersDb.findUserBy('email', 'howie@email.com')
    let {email, admin} = user
    let input = {email, admin}
    let actual = {email: 'howie@email.com', admin: true}
    expect(input).to.eql(actual)
  })

  describe('createUser(userInfo)', async () => {
    it('creates new valid user with admin rights', async () => {
      let userInfo = {
        email: 'hela@email.com',
        password: 'chicken',
        admin: true
      }

      let newUser = await usersDb.createUser(userInfo)
      expect(newUser.email).to.eql(userInfo.email)
      expect(newUser.admin).to.eql(true)
      let input = bcrypt.compareSync(userInfo.password, newUser.passwordHash)
      expect(input).to.eql(true)
    })

    it('creates new valid user without admin rights', async () => {
      let userInfo = {
        email: 'jon@email.com',
        password: 'chicken'
      }

      let newUser = await usersDb.createUser(userInfo)
      expect(newUser.email).to.eql(userInfo.email)
      expect(newUser.admin).to.eql(false)
    })

    it('checks if user with email already taken', async () => {
      let errorMessage = 'email already taken'

      let userInfo = {
        email: 'howie@email.com',
        password: 'chicken'
      }

      try {
        await usersDb.createUser(userInfo)
      } catch (err) {
        let input = err.message
        let actual = errorMessage
        expect(input).to.eql(actual)
      }
    })
  })

})