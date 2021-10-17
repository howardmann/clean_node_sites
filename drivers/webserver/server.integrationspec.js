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

    it('GET sites/name=?name= finds sites by name', async () => {
      let res = await axios.get('/sites/name?name=Castle%20Towers')
      let {id, ...input } = res.data[0]
      let actual = {name: 'Castle Towers', state: 'NSW'}
      expect(input).to.eql(actual)
    })

    it.skip('POST sites creates new site', async () => {
      let newSite = {
        name: 'Broadway Shopping Centre',
        state: 'NSW'
      }
      await axios.post('/sites', newSite)
      let res = await axios.get('/sites/name?name=Broadway%20Shopping%20Centre')
      let {id, ...input} = res.data[0]
      expect(input).to.eql(actual)
      
      await axios.delete(`/sites/${id}`)
    })
  })





})