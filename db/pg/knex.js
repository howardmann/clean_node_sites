let config = require('../../config')

let environment = config.NODE_ENV || 'development';
let knexConfig = require('../../knexfile')[environment];

module.exports = require('knex')(knexConfig);