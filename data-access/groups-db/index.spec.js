let chai = require('chai');
let expect = chai.expect;
let groupsDb = require('./index')
let sitesDb = require('../sites-db')

describe('groupsDb', () => {

  it('listGroups() lists groups', async () => {
    let input = await groupsDb.listGroups()
    let actual = 5
    expect(input.length).to.equal(actual)
  })

  it('findGroupsBySite(site_id) finds all groups belonging to site', async () => {
    let site = await sitesDb.findSitesBy('name', '55 King Street')
    let site_id = site[0].id
    let groups = await groupsDb.findGroupsbySite(site_id)
    
    let input = groups.map(el => ({name: el.name}) )
    let actual = [ { name: 'Charter Hall' }, { name: 'Charter Hall VIC' } ]    
    expect(input).to.eql(actual)
  })


})