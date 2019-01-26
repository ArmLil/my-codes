const Joi = require('joi')

const Database = require('./database')
const Api = require('./api')

const Routes = []
module.exports = Routes

Routes.push({
  method: 'GET',
  path: '/api/tweets',
  handler: Api.search,
  config: {
    validate: {
      query: {
        offset: Joi.number().min(0).default(0),
        limit: Joi.number().min(1).max(20).default(5)
      }
    },
    description: 'This gets tweets in json format',
    notes: 'We worked very hard on this endpoint, ha ha!!!',
    tags : ['api']
  }
})

Routes.push({
  method: 'POST',
  path: '/api/tweets',
  handler: Api.create,
  config: {
    validate: {
      payload: {
        user: Joi.string().required().min(3).max(255),
        tweet: Joi.string().required().min(2).max(140),
      }
    },
    description: 'This creates tweet by request body',
    tags : ['api']
  }
})

Routes.push({
  method: 'PUT',
  path: '/api/tweets/{id}',
  handler: Api.update,
  config: {
    validate: {
      payload: {
        user: Joi.string().required().min(3).max(255),
        tweet: Joi.string().required().min(2).max(140),
      },
      params: {
        id: Joi.string().required()
      }
    },
    description: 'This updates tweet by request body',
    tags : ['api']
  }
})

Routes.push({
  method: 'DELETE',
  path: '/api/tweets/{id}',
  handler: Api.deleteById,
  config: {
    validate: {
      params: {
        id: Joi.string().required()
      }
    },
    description: 'This deletes tweet by its id',
    tags : ['api']
  }
})

Routes.push({
  method: 'GET',
  path: '/api/tweets/{id}',
  handler: Api.getById,
  config: {
    validate: {
      params: {
        id: Joi.string().required()
      }
    },
    description: 'This gets tweet by its id',
    tags : ['api']
  }
})

Routes.push({
  method: 'GET',
  path: '/',
  handler: (req, reply) => reply.redirect('/api/tweets'),
  config: {
    description: 'This redirects to homepage',
    tags : ['redirect']
  }
})
