let {
  listSites,
  findSite,
  findSitesBy,
  addSite,
  listSitesWithGroups,
  dropAll
}
= require('./memory/index') // switch out db as required

let SitesDb = {
  listSites,
  findSite,
  findSitesBy,
  addSite,
  listSitesWithGroups,
  dropAll
}

module.exports = SitesDb