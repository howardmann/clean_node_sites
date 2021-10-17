let sitesDb = require('../../../data-access/sites-db')

let sites = module.exports = {}

sites.index = (req, res, next) => {
  sitesDb.listSites()
    .then(data => {
      res.send(data)
    })
}


sites.show = (req, res, next) => {
  sitesDb.findSite(req.params.id)
    .then(data => {
      res.send(data)
    })
}

sites.name = (req, res, next) => {
  sitesDb.findSitesBy('name', req.query.name)
    .then(data => {
      res.send(data)
    })
}