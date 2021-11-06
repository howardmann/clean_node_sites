const GROUPS_SITES = require('../../../memory/groups_sites')

exports.seed = async function (knex) {
  await knex.raw('DELETE FROM Groups_Sites')

  await knex.raw('ALTER SEQUENCE groups_sites_id_seq RESTART with 1')

  // we use knex helper to insert our memory csv (see below for raw sql)
  await knex('groups_sites')
    .insert(GROUPS_SITES)

    
  await knex.raw("SELECT setval('groups_sites_id_seq', max(id)) FROM groups_sites")
};