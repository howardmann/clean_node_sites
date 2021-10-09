let chai = require('chai');
let expect = chai.expect;
let rankingsDb = require('./index')
let sitesDb = require('../sites-db')
let groupsDb = require('../groups-db')

let validRankingInfo = {
  site_id: null,
  group_id: null,
  ranking: 1,
  month_end: '30/09/2021'
}

describe('rankingsDb', () => {
  beforeEach(async () => {
    let site_name = '55 King Street'
    let site = await sitesDb.findSitesBy('name', site_name)
    validRankingInfo.site_id = site[0].id
    let site_groups = await groupsDb.findGroupsbySite(validRankingInfo.site_id)
    validRankingInfo.group_id = site_groups[0].id
  })

  it('listRankings() lists rankings', async () => {
    let input = await rankingsDb.listRankings()
    let actual = 9
    expect(input.length).to.equal(actual)
  })


  describe('addRanking(rankingInfo)', async () => {
    it('inserts a ranking', async () => {
      let rankingsBefore = await rankingsDb.listRankings()

      let newRanking = await rankingsDb.addRanking(validRankingInfo)
      let {id, ...input} = newRanking
      let {ranking, ...validOpts} = validRankingInfo
      let actual = {ranking: 'First', ...validOpts}
      expect(input).to.eql(actual)
      
      // confirm it increases the rankings count
      let rankingsAfter = await rankingsDb.listRankings()
      let input2 = rankingsAfter.length - rankingsBefore.length
      let actual2 = 1
      expect(input2).to.eql(actual2)
    })

    it('throws error if site does not exist', async () => {
      let errorMessage = 'site_id does not exist.'
      let {site_id, ...validOpts} = validRankingInfo

      try {
        await rankingsDb.addRanking({site_id: 42424242, ...validOpts})
      } catch(err) {
        let input = err.message
        let actual = errorMessage
        expect(input).to.eql(actual)
      }
    })

    it('throws error if group does not exist', async () => {
      let errorMessage = 'group_id does not exist.'
      let {group_id, ...validOpts} = validRankingInfo

      try {
        await rankingsDb.addRanking({group_id: 424242, ...validOpts})
      } catch (err) {
        let input = err.message
        let actual = errorMessage
        expect(input).to.eql(actual)
      }
    })

    it('throws error if site and group do not match', async () => {
      let errorMessage = 'site_id must belong to group_id.'
      let {group_id, site_id, ...validOpts} = validRankingInfo

      let groups = await groupsDb.listGroups()
      
      let group = groups.find(el => el.name === 'QIC')
      let site = await sitesDb.findSitesBy('name', '55 King Street')

      try {
        await rankingsDb.addRanking({group_id: group.id, site_id: site[0].id, ...validOpts})
      } catch (err) {
        let input = err.message
        let actual = errorMessage
        expect(input).to.eql(actual)
      }
    })


  })

  
})