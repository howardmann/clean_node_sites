let {requiredParam, upperCase} = require('../../helpers')

let makeGroup = function(groupInfo) {
  let validate = ({name}) => {
    requiredParam(name, 'name')
    return ({name})
  }

  let normalize = ({name}) => {
    return {
      name: upperCase(name)
    }
  }

  const validGroup = validate(groupInfo)
  const normalGroup = normalize(validGroup)
  return normalGroup
}

module.exports = makeGroup