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
      if (!data) {
        return res.send({
          message: 'Site not found'
        })
      }
      res.send(data)
    })
    .catch(next)
}

sites.name = (req, res, next) => {
  sitesDb.findSitesBy('name', req.query.name)
    .then(data => {
      if (data.length === 0) {
        return res.send({
          message: 'Site not found'
        })
      }      
      res.send(data)
    })
    .catch(next)
}

sites.create = (req, res, next) => {
  sitesDb.addSite(req.body)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}

sites.delete = (req, res, next) => {
  sitesDb.deleteSite(req.params.id)
    .then(data => {
      res.send(data)
    })
    .catch(next)
}