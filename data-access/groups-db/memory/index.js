let GROUPS = require('../../../db/memory/groups') // DB
let GROUPS_SITES = require('../../../db/memory/groups_sites') // DB
let serialize = require('./serializer')

let listGroups = () => {
  return Promise.resolve(serialize(GROUPS))
}

let findGroupsbySite = async (site_id) => {
  let groups = await listGroups()
  let groups_sites = await Promise.resolve(GROUPS_SITES)
  let result = groups_sites
                .filter(el => el.site_id === site_id)
                .map(gs => groups.filter(g => g.id === gs.group_id)[0])
  
  return Promise.resolve(serialize(result))
}

module.exports = {
  listGroups,
  findGroupsbySite
}