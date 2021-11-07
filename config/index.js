require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  pg: {
    HOST: process.env.PG_HOST,
    USER: process.env.PG_USER,
    DATABASE: process.env.PG_DATABASE,
    PASSWORD: process.env.PG_PASSWORD,
    PORT: process.env.PG_PORT
  },
  SECRET_KEY: 'jwt_chicken',
  auth0: {
    AUDIENCE: process.env.AUTH0_AUDIENCE,
    CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    CLIENT_SECRET: process.env.AUTH0_CLIENT_SECRET,
    DOMAIN: process.env.AUTH0_DOMAIN 
  }
}