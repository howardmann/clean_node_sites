let {requiredParam, upperCase} = require('../../helpers')

let makeSite = function(siteInfo) {

  let validate = ({name, state}) => {
    requiredParam(name, 'name')
    requiredParam(state, 'state')
    
    let validateName = (name) => {            
      if (name.length < 2) {
        throw new Error('Site name must be at least 2 characters long.')
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
        throw new Error(`${state} state must be in Australia.`)
      }      
    }

    validateName(name)
    validateState(state)
    return ({name, state})
  }

  let normalize = ({name,state}) => {
    return {
      name: upperCase(name),
      state: state.toUpperCase()
    }
  }

  const validSite = validate(siteInfo)
  const normalSite = normalize(validSite)
  return normalSite
}

module.exports = makeSite