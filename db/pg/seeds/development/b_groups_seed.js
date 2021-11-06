const GROUPS = require('../../../memory/groups')

exports.seed = async function (knex) {
  await knex.raw('DELETE FROM Groups')

  await knex.raw('ALTER SEQUENCE groups_id_seq RESTART with 1')

  // we use knex helper to insert our memory csv (see below for raw sql)
  await knex('groups')
    .insert(GROUPS)


  await knex.raw("SELECT setval('groups_id_seq', max(id)) FROM groups")
};
