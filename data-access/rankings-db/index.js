let {
  listRankings,
  addRanking,
  dropAll
} = require('./memory/index') // switch out db as required

let rankingsDb = {
  listRankings,
  addRanking,
  dropAll
}

module.exports = rankingsDb