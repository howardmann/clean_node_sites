let {validateMakeRanking} = require('../../validators/ranking')

let makeRanking = (rankingInfo) => {  
  
  let normalize = (rankingInfo) => {
    let {rank, ...rankingOpts} = rankingInfo
    
    let rankings = [
      {pos: 1, word: 'First'},
      {pos: 2, word: 'Second'},
      {pos: 3, word: 'Third'}
    ]

    let word = rankings.find(el => el.pos === rank).word
    return {rank: word, ...rankingOpts}
  }

  const validRanking = validateMakeRanking(rankingInfo)
  return normalRanking = normalize(validRanking)
}

module.exports = makeRanking