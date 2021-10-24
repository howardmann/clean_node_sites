let config = require('./config/index')
// In terminal open psql and create a new database. Then include the name of the database and your username and password in the development details below
// Run the following terminal command
// $ psql
// # CREATE DATABASE nameofyourdatabase;
// Note: remember the semicolon syntax
// # \q
module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'howardmann',
      password: null,
      database: 'clean_node_sites',
      port: 5432
    },
    migrations: {
      directory: __dirname + '/db/pg/migrations'
    },
    seeds: {
      directory: __dirname + '/db/pg/seeds/development'
    }
  },
  production: {
    client: 'pg',
    connection: {
      host: config.pg.HOST,
      user: config.pg.USER,
      password: config.pg.PASSWORD,
      database: config.pg.DATABASE,
      port: config.pg.PORT || 5432,
      ssl: {
        rejectUnauthorized: false
      }
    },
    migrations: {
      directory: __dirname + '/db/pg/migrations'
    },
    seeds: {
      directory: __dirname + '/db/pg/seeds/development'
    }
  }
};