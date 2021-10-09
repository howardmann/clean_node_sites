let {upperCase} = require('../../helpers')
let {validateMakeSite} = require('../validator/site')

let makeSite = function(siteInfo) {

  let normalize = ({name,state}) => {
    return {
      name: upperCase(name),
      state: state.toUpperCase()
    }
  }

  const validSite = validateMakeSite(siteInfo)
  const normalSite = normalize(validSite)
  return normalSite
}

module.exports = makeSite