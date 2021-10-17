let {
  listSites,
  findSite,
  findSitesBy,
  addSite,
  listSitesWithGroups,
  dropAll,
  deleteSite
}
// switch out db as required
// = require('./memory') 
= require('./pg') 

let SitesDb = {
  listSites,
  findSite,
  findSitesBy,
  addSite,
  listSitesWithGroups,
  dropAll,
  deleteSite
}

module.exports = SitesDb