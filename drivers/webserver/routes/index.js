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


// example using auth0
const auth0 = require('../auth0')

router
  .post('/auth0/login', auth0.login) 
  .get('/auth0/private', auth0.checkJwt, (req, res) => {
    res.json({
      message: 'private endpoint. must be authenticated to see this.'
    })
  })  
  .get('/auth0/private/sites', auth0.checkJwt, auth0.adminRequired, sites.index)


module.exports = router