let chai = require('chai');
let expect = chai.expect;
let groupsSitesDb = require('./index')
let GROUPS_SITES = require('../../db/memory/groups_sites') // csv seeder


describe('groupsSitesDb', () => {
  beforeEach(async () => {
    await groupsSitesDb.dropAll();
    // when using async await in map must wrap in Promise.all
    await Promise.all(GROUPS_SITES.map(async el => {
      let newGroupSite = await groupsSitesDb.addGroupSite(el)
      return newGroupSite
    }))
  })

  it('listGroupSites() lists all groupSite pairs', async () => {
    let input = await groupsSitesDb.listGroupsSites()
    let actual = GROUPS_SITES.length
    expect(input.length).to.equal(actual)
  })

  it('dropAll() drops database', async () => {
    await groupsSitesDb.dropAll()
    let groupsSites = await groupsSitesDb.listGroupsSites()
    let input = groupsSites.length
    let actual = 0
    expect(input).to.equal(actual)
  })


  describe('addGroupSite(info)', async () => {
    it('inserts a groupSite', async () => {
      let groupSite = {
        site_id: 28,
        group_id: 2
      }
      let newGroupSite = await groupsSitesDb.addGroupSite(groupSite)

      let {
        id,
        ...input
      } = newGroupSite

      let actual = groupSite
      expect(input).to.eql(actual)
    })
  })

})