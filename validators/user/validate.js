let validator = require('../validatejs/index')

// ^ stops preprending attribute capitalised in message
let userSchema = {
  email: {
    presence: {
      message: '^email cannot be null or undefined.'
    },
    email: {
      message: '^not a valid email.'
    }
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      message: "^password must be at least 6 characters"
    }
  },
  admin: {
    type: {
      type: 'boolean',
      message: '^admin must be boolean'
    }
  }
 }

let validateMakeUser = (userInfo) => {
  let result = validator(userInfo, userSchema)
  if (result.error) {
    let firstErrMsg = result.error[0]
    throw new Error(firstErrMsg)
  }
  return result
}

module.exports = {
  validateMakeUser
}
