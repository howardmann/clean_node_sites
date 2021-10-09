let validate = require('validate.js')

// Helper functiont to transform error messages into error array otherwise return payload
let validator = (payload, schema) => {
  let result = validate(payload, schema)
  if (result == undefined) {
    return payload
  }
  let message = []
  for (var key in result) {
    message.push(result[key][0])
  }
  return {
    error: message
  }
}

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


// ^ stops preprending attribute capitalised
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
    throw new Error (result.error[0])
  }
  return result  
}

module.exports = {
  validateMakeSite
}


