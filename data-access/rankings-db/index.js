let {
  listRankings,
  addRanking
} = require('./memory/index') // switch out db as required

let rankingsDb = {
  listRankings,
  addRanking
}

module.exports = rankingsDb