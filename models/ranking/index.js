let {requiredParam} = require('../../helpers')


let makeRanking = (rankingInfo) => {  
  let validate = ({ranking, site_id, group_id, month_end}) => {
    requiredParam(ranking, 'ranking')
    requiredParam(site_id, 'site_id')
    requiredParam(group_id, 'group_id')
    requiredParam(month_end, 'month_end')

    let validatePosition = (ranking) => {
      let validPos = [1,2,3].includes(ranking)
      if(!validPos) {
        throw new Error('ranking must be either 1,2 or 3.')
      }    
    }

    let validateMonthEnd = (month_end) => {
      let reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
      if (!month_end.match(reg)) {
        throw new Error('month_end not valid date format dd/mm/yyyy.')
      }
    }

    validatePosition(ranking)
    validateMonthEnd(month_end)
    return ({ranking, site_id, group_id, month_end})
  }

  let normalize = (rankingInfo) => {
    let {ranking, ...rankingOpts} = rankingInfo
    
    let rankings = [
      {pos: 1, word: 'First'},
      {pos: 2, word: 'Second'},
      {pos: 3, word: 'Third'}
    ]

    let word = rankings.find(el => el.pos === ranking).word
    return {ranking: word, ...rankingOpts}
  }

  const validRanking = validate(rankingInfo)
  return normalRanking = normalize(validRanking)
}

module.exports = makeRanking