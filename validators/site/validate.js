let validator = require('../validatejs/index')

const VALID_STATES = [
  'NSW',
  'VIC',
  'QLD',
  'SA',
  'WA',
  'ACT',
  'TAS',
  'NT'
]

// ^ stops preprending attribute capitalised in message
let siteSchema = {
  name: {
    presence: {message: '^name cannot be null or undefined.'}, 
    type: 'string',
    length: {
      minimum: 2,
      message: 'must be at least 2 characters long.'
    }
  },
  state: {
    presence: {message: '^state cannot be null or undefined.'},
    type: 'string',
    inclusion: (e) => {
      // allow lowercase valid states to pass
      let normalise = e && e.toUpperCase()
      if (VALID_STATES.includes(normalise)) {
        return null
      }
      return {
        within: VALID_STATES,
        message: 'must be in Australia.'
      }
    }
  }
}

let validateMakeSite = (siteInfo) => {
  let result =  validator(siteInfo, siteSchema)
  if (result.error) {
    let firstErrMsg = result.error[0]
    throw new Error (firstErrMsg)
  }
  return result  
}

module.exports = {
  validateMakeSite
}


