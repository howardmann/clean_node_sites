let {auth0} = require('../../../../config')
let {DOMAIN, CLIENT_ID, CLIENT_SECRET} = auth0
let axios = require("axios");


// get MGMT_API_ACCESS_TOKEN
let getMgmtToken = () => {
  let data =  {
    'grant_type': 'client_credentials',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'audience': `https://${DOMAIN}/api/v2/`
  }
  return axios.post(`https://${DOMAIN}/oauth/token`,data)
}

// Simple middleware to check if user admin
// To be used after verifyToken middleware as it sets user email under req.auth
let adminRequired = async function (req, res, next) {
  let auth = req.auth
  let USER_ID = auth.payload && auth.payload.sub

  let resp = await getMgmtToken()
  let MGMT_API_ACCESS_TOKEN = resp.data.access_token  
  
  let URL = `https://${DOMAIN}/api/v2/users/${USER_ID}/roles`
  
  let {data} = await axios.get(URL,{
    headers: {
      authorization: `Bearer ${MGMT_API_ACCESS_TOKEN}`
    }
  })
  let roles = data.map(el => el.name)
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