let USERS = require('../../../db/memory/users')
let makeUser = require('../../../models/user/index')


let listUsers = () => {
  return Promise.resolve(USERS)
}

let findUserBy = (key, value) => {
  let user = USERS.filter(user => user[key] === value)[0]
  return Promise.resolve(user)
}

let createUser = async (userInfo) => {
  let user = makeUser(userInfo)
  let newUser = {
    id: USERS.length + 1,
    email: user.email,
    passwordHash: user.passwordHash,
    admin: user.admin
  }

  // check if email unique
  let usersEmailArr = await listUsers().then(res => res.map(el => el.email))
  let checkUserEmailUnique = usersEmailArr.includes(newUser.email) ? false : true
  if(!checkUserEmailUnique) {
    throw new Error('email already taken')
  }

  USERS.push(newUser)
  return findUserBy('email', newUser.email)
}

let dropAll = () => {
  USERS = [];
  return USERS;
}

module.exports = {
  listUsers,
  findUserBy,
  createUser,
  dropAll
}