let {findUserBy, listUsers} = require('../../../data-access/users-db')


let profiles = module.exports = {}

profiles.show = async (req, res) => {
  let auth = req.auth

  let user =  await findUserBy('email', auth.email)
  res.send(user)
}

profiles.index = async (req, res) => {
  let users = await listUsers()
  res.send(users) 
}