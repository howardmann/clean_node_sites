let {requiredParam} = require('../../../helpers')

let validateMakeSite = (siteInfo) => {
  let {name, state} = siteInfo
  requiredParam(name, 'name')
  requiredParam(state, 'state')

  let validateName = (name) => {
    if (name.length < 2) {
      throw new Error('Name must be at least 2 characters long.')
    }
  }

  let validateState = (state) => {
    let statesAUS = [
      'NSW',
      'VIC',
      'QLD',
      'SA',
      'WA',
      'ACT',
      'TAS',
      'NT'
    ]

    let validState = statesAUS.includes(state.toUpperCase())
    if (!validState) {
      throw new Error('State must be in Australia.')
    }
  }

  validateName(name)
  validateState(state)
  return ({name, state})
}


module.exports = {
  validateMakeSite
}






