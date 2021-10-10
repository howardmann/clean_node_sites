let knex = require('../../../db/pg/knex')

let listGroupsSites = () => {
  return knex.raw(`SELECT * FROM Groups_Sites;`)
    .then(data => data.rows)
}

// WORKING ON ADD GROUP SITE
let addGroupSite = (info) => {
  let {site_id, group_id} = info
  return knex('group_sites')
}
// let addSite = async (siteInfo) => {
//   let newSite = makeSite(siteInfo)

//   // check site name unique
//   let sitesNameArr = await listSites().then(result => result.map(el => el.name))
//   let checkSiteNameUnique = sitesNameArr.includes(newSite.name) ? false : true
//   if (!checkSiteNameUnique) {
//     throw new Error(`${newSite.name} site name must be unique.`)
//   }

//   return knex('sites')
//     .insert(newSite)
//     .returning('*')
//     .then(result => result[0])
// }


let dropAll = () => {
  return knex.raw(`
    DELETE FROM groups_sites;
    ALTER SEQUENCE groups_sites_id_seq RESTART WITH 1;
  `)
}

module.exports = {
  listGroupsSites,
  // addGroupSite,
  dropAll
}