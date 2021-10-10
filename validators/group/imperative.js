let requiredParam = require('../../helpers/requiredParam')

let validateMakeGroup = ({name}) => {
  requiredParam(name, 'name')

  let validateLength = (name) => {
    if (name.length < 3) {
      throw new Error('name min 3 characters.')
    }
  }
  validateLength(name)
  return ({name})
}

module.exports = {
  validateMakeGroup
}