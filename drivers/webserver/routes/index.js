const express = require('express')
const router = express.Router()

const sites = require('./sites')
const auth = require('../auth')

router
  .post('/login', auth.login)

router
  .get('/sites', sites.index)
  .get('/sites/name', sites.name)
  .get('/sites/:id', sites.show)
  .post('/sites', sites.create)
  .delete('/sites/:id', sites.delete)
  


module.exports = router