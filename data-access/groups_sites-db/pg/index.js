let knex = require('../../../db/pg/knex')

let listGroupsSites = () => {
  return knex.raw(`SELECT * FROM Groups_Sites;`)
    .then(data => data.rows)
}

let addGroupSite = (info) => {
  let {site_id, group_id} = info
  let newGroupSite = {site_id, group_id}
  return knex('groups_sites')
    .insert(newGroupSite)
    .returning('*')
    .then(result => result[0])    
}

let dropAll = () => {
  return knex.raw(`
    DELETE FROM groups_sites;
    ALTER SEQUENCE groups_sites_id_seq RESTART WITH 1;
  `)
}

module.exports = {
  listGroupsSites,
  addGroupSite,
  dropAll
}