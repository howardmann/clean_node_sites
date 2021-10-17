const express = require('express')
const router = express.Router()

const sites = require('./sites')

router
  .get('/sites', sites.index)
  .get('/sites/name', sites.name)
  .get('/sites/:id', sites.show)
  


module.exports = router