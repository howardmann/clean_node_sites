let SITES = require('../../../db/memory/sites') // DB
let groupsDb = require('../../groups-db')
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
  let sites = await listSites()

  // map through all sites and add group name
  let result = await Promise.all(sites.map(async site => {
    let site_id = site.id
    let groups = await groupsDb.findGroupsbySite(site_id)
    let group_name_arr = groups.map(el => el.name)

    return {...site, groups: group_name_arr}
  }))
  
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