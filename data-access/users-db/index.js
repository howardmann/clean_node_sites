let {
  listUsers,
  findUserBy,
  createUser,
  dropAll
}
// switch out db as required
= require('./memory') 
// = require('./pg')

let UsersDb = {
  listUsers,
  findUserBy,
  createUser,
  dropAll
}

module.exports = UsersDb