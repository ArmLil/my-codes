'use strict'
const Hapi = require('hapi')
const HapiSwagger = require('hapi-swagger')
const Inert = require('inert')
const Vision = require('vision')

const server = new Hapi.Server()

const Pack = require('./package')
const routes = require('./routes')

server.connection({
  host: 'localhost',
  port: 4000,
  router: {
    stripTrailingSlash: true
  },
  routes: {
    files: {
      relativeTo: __dirname + '/public'
    }
  }
})

server.register([
  Inert,
  Vision,
  {
    'register': HapiSwagger,
    'options': {
      info: {
        title: 'Tweets API',
        version: Pack.version,
      }
    }
  }], (error) => {
    if (error) console.error(('register error'), error)
    server.route(routes)
})


server.start((error) => {
  if(error) console.error(error)
  console.log('server started on', server.info.uri)
})
