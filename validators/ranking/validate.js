let validator = require('../validatejs/index')
let {parse, isValid} = require('date-fns')


// ^ stops preprending attribute capitalised in message
let rankingSchema = {
  rank: {
    presence: {message: '^rank cannot be null or undefined.'},
    inclusion: {
      within: [1, 2, 3],
      message: '^rank must be either 1,2 or 3.'
    }
  },
  site_id: { presence: {message: '^site_id cannot be null or undefined.'}},
  group_id: {presence: {message: '^group_id cannot be null or undefined.'}},
  month_end: {
    presence: {message: '^month_end cannot be null or undefined.'},
    type: {
      type: (value) => {
        let parsedDate = parse(value, 'dd/MM/yyyy', new Date())
        return isValid(parsedDate)
      },
      message: '^month_end not valid date format dd/mm/yyyy.'
    }
  }
}

let validateMakeRanking = (payload) => {
  let result = validator(payload, rankingSchema)
  
  if (result.error) {
    let firstErrMsg = result.error[0]
    throw new Error(firstErrMsg)
  }
  return result
}

module.exports = {
  validateMakeRanking
}
