const SITES = require('../../../memory/sites')
const PROD_SITES = SITES.map(el => ({name: el.name, state: el.state}))

exports.seed = async function(knex) {
  await knex.raw('DELETE FROM Sites')

  // reset id counter to start at 1
  await knex.raw('ALTER SEQUENCE sites_id_seq RESTART with 1')
  

  // we use knex helper to insert our memory csv (see below for raw sql)
  await knex('sites')
    .insert(SITES)


  // reset counter to max id (used when seeding entries with custom id)
  await knex.raw("SELECT setval('sites_id_seq', max(id)) FROM sites")

  // await knex.raw(`
  //   INSERT INTO Sites (name, state) VALUES
  //   ('55 King St', 'VIC'),
  //   ('Robina Town Centre', 'QLD'),
  //   ('Westpoint', 'NSW')
  // `)

  // for heroku prod we dont specify id
  // await knex('sites')
  //   .insert(PROD_SITES)

};




