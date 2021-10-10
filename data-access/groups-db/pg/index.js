let knex = require('../../../db/pg/knex')

let listGroups = () => {
  return knex.raw(`SELECT * FROM Groups;`)
    .then(data => data.rows)
}

let findGroupsbySite = async (site_id) => {
  return knex.raw(`
    SELECT Groups.id, Groups.name
    FROM Groups
    INNER JOIN Groups_Sites
    ON Groups.id = Groups_Sites.group_id
    INNER JOIN Sites
    ON Groups_Sites.site_id = Sites.id
    WHERE Sites.id = ${site_id}
  `)
  .then(data => data.rows)
}

module.exports = {
  listGroups,
  findGroupsbySite
}