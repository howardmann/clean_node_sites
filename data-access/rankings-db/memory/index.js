let RANKINGS = require('../../../db/memory/rankings') // DB
// let GROUPS_SITES = require('../../../db/memory/groups_sites') // DB
let serialize = require('./serializer')
let makeRanking = require('../../../models/ranking')
let sitesDb = require('../../sites-db')
let groupsDb = require('../../groups-db')

let listRankings = () => {
  return Promise.resolve(serialize(RANKINGS))
}

let addRanking = async (rankingInfo) => {
  let {site_id, group_id} = rankingInfo  

  let validateSite = async (site_id) => {
    let site = await sitesDb.findSite(site_id)
    if (!site) {
      throw new Error('site_id does not exist.')
    }
  }

  let validateGroup = async (group_id) => {
    let groups = await groupsDb.listGroups()
    let group = groups.find(el => el.id === group_id)
    if (!group) {
      throw new Error('group_id does not exist.')
    }
  }

  let validateSiteGroupMatch = async ({site_id, group_id}) => {    
    let groups = await groupsDb.findGroupsbySite(site_id)
    let groupMatch = groups.filter(el => el.id === group_id).length > 0 ? true : false
    if (!groupMatch) {
      throw new Error(`site_id must belong to group_id.`)
    }
  }

  await validateSite(site_id)
  await validateGroup(group_id)
  await validateSiteGroupMatch({site_id, group_id})
  
  let newRankingInfo = makeRanking(rankingInfo)
  let newRanking = {id: RANKINGS.length + 1, ...newRankingInfo}  
  
  RANKINGS.push(newRanking)
  
  
  return Promise.resolve(newRanking)
}

let dropAll = async () => {
  RANKINGS = []
  return listRankings() 
}

module.exports = {
  listRankings,
  addRanking,
  dropAll
}