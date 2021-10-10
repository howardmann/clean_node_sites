let validator = require('../validatejs/index')

// ^ stops preprending attribute capitalised in message
let groupSchema = {
  name: {
    presence: {
      message: '^name cannot be null or undefined.'
    },
    length: {
      minimum: 3,
      message: '^name min 3 characters.'
    }
  }
}

let validateMakeGroup = (groupInfo) => {
  let result = validator(groupInfo, groupSchema)
  if (result.error) {
    let firstErrMsg = result.error[0]
    throw new Error(firstErrMsg)
  }
  return result
}

module.exports = {
  validateMakeGroup
}
