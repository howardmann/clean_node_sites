let SITES = require('../../../db/memory/sites') // DB
let GROUPS = require('../../../db/memory/groups') // DB
let GROUPS_SITES = require('../../../db/memory/groups_sites') // DB
let serialize = require('./serializer') // serializer custom to db
let makeSite = require('../../../models/site/index') // site model

let listSites = () => {
  return Promise.resolve(serialize(SITES))
}

let findSite = (id) => {
  let site = SITES.find(site => site['id'] == id)
  return Promise.resolve(serialize(site))
}

let findSitesBy = (prop, val) => {
  let sites = SITES.filter(site => site[prop] === val)
  return Promise.resolve(serialize(sites))
}

let addSite = async (siteInfo) => {
  let site = makeSite(siteInfo) 
  let newSite = {
    id: SITES.length + 1,
    name: site.name,
    state: site.state
  }

  // check site name unique
  let sitesNameArr = await listSites().then(result => result.map(el => el.name))
  let checkSiteNameUnique = sitesNameArr.includes(newSite.name) ? false : true
  if (!checkSiteNameUnique) {
    throw new Error(`${newSite.name} site name must be unique.`)
  }

  SITES.push(newSite)
  return findSite(newSite.id)
}


let listSitesWithGroups = async () => {
  // list all sites
  let sites = await Promise.resolve(serialize(SITES))
  // list all groups_sites
  let groups_sites = await Promise.resolve(GROUPS_SITES)
  // list all GROUPS
  let groups = await Promise.resolve(GROUPS)

  // map each each site_id
  let result = sites.map(site => {    
    let site_id = site.id  
    // return group_id of groups_sites match site_id
    let groups_sites_arr = groups_sites.filter(el => el['site_id'] === site_id)
    let group_name_arr = groups_sites_arr.map(el => groups.filter(group => group['id'] === el['group_id'])[0]).map(el => el['name'])
    
    // returnne wobject with group_names as array
    return {...site, groups: group_name_arr}
  })
  return result
}

let dropAll = () => {
  SITES = [];
  return SITES;
}

module.exports = {
  listSites,
  findSite,
  findSitesBy,
  listSitesWithGroups,
  addSite,
  // deleteSite,
  dropAll
}