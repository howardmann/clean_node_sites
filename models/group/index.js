let {upperCase} = require('../../helpers')
let {validateMakeGroup} = require('../validator/group')

let makeGroup = function(groupInfo) {
  let normalize = ({name}) => {
    return {
      name: upperCase(name)
    }
  }

  const validGroup = validateMakeGroup(groupInfo)
  const normalGroup = normalize(validGroup)
  return normalGroup
}

module.exports = makeGroup