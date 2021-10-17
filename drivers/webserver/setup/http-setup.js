const axios = require('axios')
const app = require('../server')

// create a new server instance and replace baseURL with localhost and running port
module.exports = async function httpSetup () {
  const listener = app.listen()
  const port = listener.address().port
  const baseURL = `http://localhost:${port}`
  axios.defaults.baseURL = baseURL

  return listener
}