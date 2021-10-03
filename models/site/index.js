// Helper throw error message if value missing
let requiredParam = (param, property) => {
  if (param === undefined || param === null) {
    throw new Error (`${property} can not be null or undefined.`)
  }
  return param
}


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
        'TAS'
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

  let normalize = ({name,state}) => {
    let capitalizeWord = (word) => word.charAt(0).toUpperCase() + word.slice(1)
    let upperCase = (string) => string.split(' ').map(word => capitalizeWord(word)).join(' ')

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