let {
  listGroups,
  findGroupsbySite
} = require('./memory/index') // switch out db as required

let groupsDb = {
  listGroups,
  findGroupsbySite
}

module.exports = groupsDb