const {auth0} = require('../../../config')
const {AUDIENCE, CLIENT_ID, CLIENT_SECRET, DOMAIN} = auth0
const axios = require('axios')

let login = async (req, res, next) => {
  let {email, password} = req.body

  let data = {
    grant_type: 'password',
    username: email,
    password: password,
    audience: AUDIENCE,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  }
  try {
    let resp = await axios.post(`https://${DOMAIN}/oauth/token`, data)
    res.send(resp.data)
  } catch(err) {
    next(err)
  }
}

module.exports = login