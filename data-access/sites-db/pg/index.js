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

let listSitesWithGroups = () => {
  // list all sites with group names aggregated as array
  return knex.raw(`
    SELECT Sites.id, Sites.name, Sites.state, array_agg(Groups.name) as groups
    FROM Sites
    INNER JOIN Groups_Sites
    ON Sites.id = Groups_Sites.site_id
    INNER JOIN Groups
    ON Groups_Sites.group_id = Groups.id
    GROUP BY sites.id
    ORDER BY sites.id
  `)
  .then(data => data.rows)  
}


let dropAll = () => {
  return knex.raw(`
    DELETE FROM sites;
    ALTER SEQUENCE sites_id_seq RESTART WITH 1;
  `)
}

let deleteSite = (id) => {
  return knex('sites')
    .where('id', id)
    .del()
    .returning('*')
    .then(result => result[0])
}


module.exports = {
  listSites,
  findSite,
  findSitesBy,
  listSitesWithGroups,
  addSite,
  dropAll,
  deleteSite
}