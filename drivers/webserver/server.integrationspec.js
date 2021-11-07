let chai = require('chai');
let expect = chai.expect;
const axios = require('axios')
const httpSetup = require('./setup/http-setup')
const jwt = require('jsonwebtoken')
const {SECRET_KEY} = require('../../config')


let listener

describe('server', () => {
  beforeEach(async () => {
    // open a new server listening on config PORT
    listener = await httpSetup()
  })

  afterEach(async () => {
    // close server
    listener.close()
  })

  it('pings', async () => {
    let res = await axios.get('/ping')
    let input = res.data
    let actual = {data: 'pong'}
    expect(input).to.eql(actual)
  })

  describe('/auth', () => {
    it('POST /auth/login valid credentials returns token', async () => {
      let credentials = {
        email: 'howie@email.com',
        password: 'chicken'
      }
      let res = await axios.post('/login', credentials)
      let {message, email, token} = res.data
      let input = {message, email}
      let actual = {
        message: "Authenticated! Use this token in your Authorization header as Bearer token",
        email: credentials.email
      }
      // check message and email
      expect(input).to.eql(actual)
      // check jwt token is valid and contains email
      let data = await jwt.verify(token, SECRET_KEY)
      expect(data.email).to.eql(credentials.email)
    })

    it('POST /auth/login invalid credentials forbidden', async () => {
      let credentials = {
        email: 'howie@email.com',
        password: 'fakeChicken'
      }
      try {
        await axios.post('/login', credentials)
      } catch(err) {
        let input = err.response.status
        let actual = 403
        expect(input).to.eql(actual)
      }
    })
  })

  describe('/private', () => {
    it('GET /private/profile is forbidden for non users', async () => {
      try {
        await axios.get('/private/profile')
      } catch (err) {
        let input = err.response.status
        let actual = 403
        expect(input).to.eql(actual)
      }
    })

    it('GET /private/profile returns user profile', async () => {
      let credentials = {
        email: 'felix@email.com',
        password: 'chicken'
      }
      let authRes = await axios.post('/login', credentials)
      let {token} = authRes.data

      let res = await axios.get('/private/profile', {
        headers: {
          'authorization': `bearer ${token}`
        }
      })
      let {email} = res.data
      let input = email
      let actual = credentials.email
      expect(input).to.eql(actual)
    })

    it('GET /private/profile/all returns all user profiles for admin user tokens only', async () => {
      let credentials = {
        email: 'howie@email.com',
        password: 'chicken'
      }
      let authRes = await axios.post('/login', credentials)
      let {
        token
      } = authRes.data


      let res = await axios.get('/private/profile/all', {
        headers: {
          'authorization': `bearer ${token}`
        }
      })
      let input = res.data.length
      let actual = 2
      expect(input).to.eql(actual)
    })

    it('GET /private/profile/all forbidden for non admin user tokens', async () => {
      let credentials = {
        email: 'felix@email.com',
        password: 'chicken'
      }
      let authRes = await axios.post('/login', credentials)
      let { token } = authRes.data

      try {
        await axios.get('/private/profile/all', {
          headers: {
            'authorization': `bearer ${token}`
          }
        })
      } catch(err) {
        let input = err.response.data.message
        let actual = 'Admin only'
        expect(input).to.eql(actual)
      }
    })
  })

  describe('/sites', () => {
    it('GET sites/ lists all sites', async () => {
      let res = await axios.get('/sites')
      let input = res.data.length
      let actual = 48
      expect(input).to.eql(actual)
    })

    it('GET sites/:id finds site by id', async () => {
      let sites = await axios.get('/sites')
      let firstSite = sites.data[0]
      let res = await axios.get(`/sites/${firstSite.id}`)
      let input = res.data.name
      let actual = firstSite.name
      expect(input).to.eql(actual)
    })

    it('GET sites/:id returns message when not found', async () => {
      let incorrectId = 4242
      let res = await axios.get(`/sites/${incorrectId}`)
      let input = res.data.message
      let actual = 'Site not found'
      expect(input).to.eql(actual)
    })


    it('GET sites/name=?name= finds sites by name', async () => {
      let res = await axios.get('/sites/name?name=castle%20towers')
      let {id, ...input } = res.data[0]
      let actual = {name: 'Castle Towers', state: 'NSW'}
      expect(input).to.eql(actual)
    })

    it('POST sites creates single new site and DELETE sites/:id deletes single site', async () => {
      const SITE_NAME = 'Broadway'

      // Check if broadway exists and delete if it does
      let siteRes = await axios.get(`/sites/name?name=${SITE_NAME}`)
      let siteId = siteRes.data && siteRes.data[0] && siteRes.data[0].id ? siteRes.data[0].id : null
      
      siteId && await axios.delete(`/sites/${siteId}`)

      // create new site
      let newSite = {name: SITE_NAME, state: 'NSW'}
      await axios.post('/sites', newSite)

      // check if exists
      let res = await axios.get(`/sites/name?name=${SITE_NAME}`)
      let {id, ...input} = res.data[0]
      let actual = newSite

      expect(input).to.eql(actual)
      
      // delete
      await axios.delete(`/sites/${id}`)
    })
  })

  describe('auth0', () => {
    it('POST /auth0/login returns 403 if invalid email or password', async () => {
      let credentials = {
        email: 'howieinvalid@email.com',
        password: 'chicken'
      }
      try {
        await axios.post('/auth0/login', credentials)
      } catch(err) {
        let input = err.response.status
        let actual = 403
        expect(input).to.eql(actual)
      }
    }).timeout(5000)

    it('GET /auth0/private is forbidden for non users', async () => {
      try {
        await axios.get('/auth0/private')
      } catch (err) {
        let input = err.response.status
        let actual = 401
        expect(input).to.eql(actual)
      }
    })

    it('GET /auth0/private returns message for valid user token', async () => {
      let credentials = {
        email: 'howardmann27@gmail.com',
        password: 'chicken'
      }
      let authRes = await axios.post('/auth0/login', credentials)
      let token = authRes.data.access_token

      let res = await axios.get('/auth0/private', {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      let input = res.data.message
      let actual = 'private endpoint. must be authenticated to see this.'
      expect(input).to.eql(actual)
    }).timeout(5000)

    it('GET /auth0/private/sites valid for users with admin role', async () => {
      let credentials = {
        email: 'howardmann27@gmail.com',
        password: 'chicken'
      }
      let authRes = await axios.post('/auth0/login', credentials)
      let token = authRes.data.access_token

      let res = await axios.get('/auth0/private/sites', {
        headers: {
          'authorization': `Bearer ${token}`
        }
      })
      let input = res.data.length
      let actual = 48
      expect(input).to.eql(actual)
    }).timeout(5000)

    it('GET /auth0/private/sites forbidden for users without admin role', async () => {
      let credentials = {
        email: 'howardmann27+auth0@gmail.com',
        password: 'chicken'
      }
      let authRes = await axios.post('/auth0/login', credentials)
      let token = authRes.data.access_token

      try {
        await axios.get('/auth0/private/sites', {
          headers: {
            'authorization': `Bearer ${token}`
          }
        })
      } catch(err) {
        let input = err.response.status
        let actual = 401
        expect(input).to.eql(actual)
      }
    }).timeout(5000)



})




})