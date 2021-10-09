let {requiredParam} = require('../../helpers')

let validate = ({ranking}) => {
  requiredParam(ranking, 'ranking')

  let validatePosition = (ranking) => {
    let validPos = [1,2,3].includes(ranking)
    if(!validPos) {
      throw new Error('ranking must be either 1,2 or 3.')
    }    
  }

  validatePosition(ranking)
  return ({ranking})
}

let normalize = ({ranking}) => {
  let rankings = [
    {pos: 1, word: 'First'},
    {pos: 2, word: 'Second'},
    {pos: 3, word: 'Third'}
  ]

  let word = rankings.filter(el => el.pos === ranking)[0].word

  return {
    ranking: word
  }
}

let makeRanking = function(rankingInfo) {
  const validRanking = validate(rankingInfo)
  return normalRanking = normalize(validRanking)
}

module.exports = makeRanking