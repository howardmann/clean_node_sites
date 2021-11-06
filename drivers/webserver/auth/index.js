let login = require('./login')
let verifyToken = require('./middleware/verifyToken')
let adminRequired = require('./middleware/adminRequired')

module.exports = {
  login,
  verifyToken,
  adminRequired
}