const {auth} = require('express-oauth2-jwt-bearer')

const checkJwt = auth({
  audience: `https://expressleaderboard/api`,
  issuerBaseURL: `https://dev-kyl9on70.us.auth0.com/`
})

module.exports = {
  checkJwt
}