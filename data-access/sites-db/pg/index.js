// let SITES = require('../../../db/memory/sites') // DB
// let groupsDb = require('../../groups-db')
// let serialize = require('./serializer') // serializer custom to db

let makeSite = require('../../../models/site/index') // site model
let knex = require('../../../db/pg/knex')

let listSites = () => {
  return knex.raw(`SELECT * FROM Sites;`)
    .then(data => data.rows)
}

let findSite = (id) => {
  return knex.raw(`
      SELECT * FROM Sites WHERE id='${id}'
    `)
    .then(data => data.rows[0])
}

let findSitesBy = (prop, val) => {
  return knex.raw(`
    SELECT * FROM Sites WHERE ${prop}= '${val}'
  `)
    .then(data => data.rows)
}

let addSite = async (siteInfo) => {
  let newSite = makeSite(siteInfo)
  
  // check site name unique
  let sitesNameArr = await listSites().then(result => result.map(el => el.name))
  let checkSiteNameUnique = sitesNameArr.includes(newSite.name) ? false : true
  if (!checkSiteNameUnique) {
    throw new Error(`${newSite.name} site name must be unique.`)
  }

  return knex('sites')
    .insert(newSite)
    .returning('*')
    .then(result => result[0])
}

// let listSitesWithGroups = async () => {
//   // list all sites
//   let sites = await listSites()

//   // map through all sites and add group name
//   let result = await Promise.all(sites.map(async site => {
//     let site_id = site.id
//     let groups = await groupsDb.findGroupsbySite(site_id)
//     let group_name_arr = groups.map(el => el.name)

//     return {...site, groups: group_name_arr}
//   }))
  
//   return result
// }

let dropAll = () => {
  return knex.raw(`
    DELETE FROM sites;
    ALTER SEQUENCE sites_id_seq RESTART WITH 1;
  `)
}

module.exports = {
  listSites,
  findSite,
  findSitesBy,
  // listSitesWithGroups,
  addSite,
  dropAll
}