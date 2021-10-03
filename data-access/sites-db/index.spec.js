let chai = require('chai');
let expect = chai.expect;
let sitesDb = require('./index')
let SITES = require('../../db/memory/sites')

describe('sitesDb', () => {
  beforeEach(async () => {
    await sitesDb.dropAll();
    await SITES.map(el => {
      return sitesDb.addSite(el)
    })
  })

  it('dropAll() drops database', async () => {
    await sitesDb.dropAll()
    let sites = await sitesDb.listSites()
    let input = sites.length
    let actual = 0
    expect(input).to.equal(actual)
  })

  it('listSites() lists sites', async () => {
    let input = await sitesDb.listSites()
    let actual = 48
    expect(input.length).to.equal(actual)
  })

  it('findSite() find single site by id', async () => {
    let sites = await sitesDb.listSites()
    let id = sites[0].id

    let site = await sitesDb.findSite(id)
    let input = site.id
    let actual = id
    expect(input).to.eql(actual)
  })

  it('findSitesBy(prop, val) finds all sites by property', async () => {
    let sites = await sitesDb.findSitesBy('state', 'NSW')    
    let castle_towers = sites.filter(el => el.name === 'Castle Towers')[0]
    let {id, ...input} = castle_towers
    let actual = {name: 'Castle Towers', state: 'NSW'}
    expect(input).to.eql(actual)
  })

  it('addSite(siteInfo) inserts a site', async () => {
    let site = {
      name: '123 New Site',
      state: 'NSW'
    }
    let newSite = await sitesDb.addSite(site)
    
    let {id,...input} = newSite
    
    let actual = {
      name: '123 New Site',
      state: 'NSW'
    }
    expect(input).to.eql(actual)
  })

  it('listSitesWithGroups() lists sites with groups name', async () => {
    let sites = await sitesDb.listSitesWithGroups()
    let {id, ...input} = sites.filter(el => el.name === 'Robina Town Centre')[0]
    let actual = {name: 'Robina Town Centre', state:'QLD', groups: ['QIC']}
    expect(input).to.deep.eql(actual)
  })

  
})