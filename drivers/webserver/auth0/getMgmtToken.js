let axios = require("axios");
let {auth0} = require('../../../config')
let {DOMAIN, CLIENT_ID, CLIENT_SECRET} = auth0

// auth0 API for returning MGMT_API_TOKEN
// https://auth0.com/docs/security/tokens/access-tokens/get-management-api-access-tokens-for-production
module.exports = () => {
  let data = {
    'grant_type': 'client_credentials',
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'audience': `https://${DOMAIN}/api/v2/`
  }
  return axios.post(`https://${DOMAIN}/oauth/token`, data)
}
