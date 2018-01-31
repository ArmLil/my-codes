const Database = require('./database')
const Handlers = require('./handlers')
const Templates = require('./templates')
const Utils = require('./utils')

const Routes = []
module.exports = Routes

Routes.push({
  method: 'GET',
  path: '/api/tweets',
  handler: Handlers.apiTweetsEndpoint,
  config: {
    description: 'This loads the homepage',
    notes: 'We worked very hard on this endpoint, ha ha!!!',
    tags : ['api']
  }
})

Routes.push({
  method: 'DELETE',
  path: '/api/tweets/{id}',
  handler: Handlers.apiDeleteByIdEndpoint,
  config: {
    description: 'This deletes tweet by its id',
    tags : ['api']
  }
})

Routes.push({
  method: 'GET',
  path: '/api/tweets/{id}',
  handler: Handlers.apiGetByIdEndpoint,
  config: {
    description: 'This gets tweet by its id',
    tags : ['api']
  }
})

Routes.push({
  method: 'PUT',
  path: '/api/tweets/{id}',
  handler: Handlers.apiUpdateEndpoint,
  config: {
    description: 'This updates tweet by request bidy',
    tags : ['api']
  }
})

Routes.push({
  method: 'POST',
  path: '/api/tweets',
  handler: Handlers.apiCreateEndpoint,
  config: {
    description: 'This creates tweet by requset body',
    tags : ['api']
  }
})

Routes.push({
  method: 'GET',
  path: '/',
  handler: Handlers.rootEndpoint,
  config: {
    description: 'This loads the homepage',
    tags : ['template']
  }
})

Routes.push({
  method: 'GET',
  path: '/create',
  config: {
    handler: Handlers.createEndpoint,
    description: 'This creates tweet in db',
    notes: 'It is written without promises!!!',
    tags : ['template']
  }
})

Routes.push({
  method: 'GET',
  path: '/{id}',
  handler: Handlers.idEndpoint,
  config: {
    description: 'This gets tweet by its id',
    tags : ['template']
  }
})
