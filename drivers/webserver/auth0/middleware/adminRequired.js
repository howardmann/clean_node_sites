let {auth0} = require('../../../../config')
let {DOMAIN} = auth0
let axios = require("axios");
let getMgmtToken = require('../getMgmtToken')


// Simple middleware to check if user admin
// To be used after verifyToken middleware as it sets user email under req.auth
let adminRequired = async function (req, res, next) {
  let auth = req.auth
  let USER_ID = auth.payload && auth.payload.sub

  // get MGMT_API_ACCESS_TOKEN
  // must ensure our expressleaderboard API has read:users and read_roles permissions enabled via Auth0 Management API
  // https://manage.auth0.com/dashboard/us/dev-kyl9on70/apis/61867de743211f004204ae71/authorized-clients
  let resp = await getMgmtToken()
  let MGMT_API_ACCESS_TOKEN = resp.data.access_token  
  
  // API to fetch user roles using MGMT_API_ACCESS_TOKEN
  let {data} = await axios.get(`https://${DOMAIN}/api/v2/users/${USER_ID}/roles`, {
    headers: {authorization: `Bearer ${MGMT_API_ACCESS_TOKEN}`}
  })
  let roles = data.map(el => el.name)
  // check if roles includes admin
  let isAdmin = roles.includes('admin')

  if (!isAdmin) {
    return res.status(401).send({
      message: 'Admin only',
      auth
    })
  }
  next()
}

module.exports = adminRequired