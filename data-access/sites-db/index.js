let {
  listSites,
  findSite,
  findSitesBy,
  addSite,
  // listSitesWithGroups,
  dropAll
}
// switch out db as required
// = require('./memory') 
= require('./pg') 

let SitesDb = {
  listSites,
  findSite,
  findSitesBy,
  addSite,
  // listSitesWithGroups,
  dropAll
}

module.exports = SitesDb