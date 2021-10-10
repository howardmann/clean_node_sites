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

module.exports = validator
