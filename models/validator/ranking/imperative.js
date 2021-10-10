let {requiredParam} = require('../../../helpers/')

let validateMakeRanking = ({rank, site_id, group_id, month_end}) => {
  requiredParam(rank, 'rank')
  requiredParam(site_id, 'site_id')
  requiredParam(group_id, 'group_id')
  requiredParam(month_end, 'month_end')

  let validatePosition = (rank) => {
    let validPos = [1,2,3].includes(rank)
    if(!validPos) {
      throw new Error('rank must be either 1,2 or 3.')
    }    
  }

  let validateMonthEnd = (month_end) => {
    let reg = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    if (!month_end.match(reg)) {
      throw new Error('month_end not valid date format dd/mm/yyyy.')
    }
  }

  validatePosition(rank)
  validateMonthEnd(month_end)
  return ({rank, site_id, group_id, month_end})
}

module.exports = {
  validateMakeRanking
}