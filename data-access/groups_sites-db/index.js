let {
  listGroupsSites,
  addGroupSite,
  dropAll
} = require('./pg') // switch out db as required

let groupsSitesDb = {
  listGroupsSites,
  addGroupSite,
  dropAll
}

module.exports = groupsSitesDb