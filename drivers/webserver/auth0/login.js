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

  let options = {
    method: 'POST',
    url: `https://${DOMAIN}/oauth/token`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(data)
  };

  let resp = await axios.request(options)
  return res.send(resp.data)
}

module.exports = login