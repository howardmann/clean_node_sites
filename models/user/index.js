let {validateMakeUser} = require('../../validators/user')
const bcrypt = require('bcrypt')

let makeUser = function(userInfo) {

  let normalize = ({email, password, admin}) => {
    return {
      email,
      passwordHash: bcrypt.hashSync(password, 4),
      admin: admin || false
    }
  }
  
  const validUser = validateMakeUser(userInfo)
  const normalUser = normalize(validUser)
  return normalUser
  
}

module.exports = makeUser