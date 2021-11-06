let {findUserBy} = require('../../../data-access/users-db')
let bcrypt = require('bcrypt')

let login = async (req, res) => {
  let {email, password} = req.body

  // Find user and validate password
  let user = await findUserBy('email', email)
  let passwordValid = user && bcrypt.compareSync(password, user.passwordHash)
  
  if (!passwordValid) { 
    return res.sendStatus(403)
  }

  // // Create json webtoken with user email and id
  // let token = jwt.sign({
  //   id: user.id, 
  //   email: user.email
  // }, SECRET_KEY)

  // // Set jwt token in cookie as 'access_token'
  // res.cookie('access_token', token, {
  //   // maxAge: 365 * 24 * 60 * 60 * 100, // session only cookie
  //   httpOnly: true // cannot be modified using XSS or JS
  // })  


  res.status(200).send({
    message: 'Authenticated! Use this token in your Authorization header as Bearer token',
    email: user.email
  })
}

module.exports = login