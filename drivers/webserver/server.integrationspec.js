let chai = require('chai');
let expect = chai.expect;
const axios = require('axios')
const httpSetup = require('./setup/http-setup')

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
      let res = await axios.get('/sites/name?name=Castle%20Towers')
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





})