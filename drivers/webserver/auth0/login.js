const {auth0} = require('../../../config')
const {AUDIENCE, CLIENT_ID, CLIENT_SECRET, DOMAIN} = auth0
const axios = require('axios')
const qs = require('qs')

let login = async (req, res) => {
  let {email, password} = req.body

  let data = {
    grant_type: 'password',
    username: email,
    password: password,
    audience: AUDIENCE,
    scope: 'read:sites',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET
  }

  let resp = await axios.post(`https://${DOMAIN}/oauth/token`, data)
  return res.send(resp.data)
}

module.exports = login