const express = require('express')
const router = express.Router()

const sites = require('./sites')
const auth = require('../auth')
const profiles = require('./profiles')

router
  .post('/login', auth.login)

router
  .get('/sites', sites.index)
  .get('/sites/name', sites.name)
  .get('/sites/:id', sites.show)
  .post('/sites', sites.create)
  .delete('/sites/:id', sites.delete)
  
router
  .get('/private/profile', auth.verifyToken, profiles.show)
  .get('/private/profile/all', auth.verifyToken, auth.adminRequired, profiles.index)

module.exports = router