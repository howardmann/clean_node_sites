let {
  listGroups,
  findGroupsbySite
} 
// switch out db as required
// = require('./memory') 
= require('./pg') 

let groupsDb = {
  listGroups,
  findGroupsbySite
}

module.exports = groupsDb