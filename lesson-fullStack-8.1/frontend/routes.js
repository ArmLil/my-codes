'use strict'
const Joi = require('joi')
const Handlers = require('./handlers')

const Routes = []
module.exports = Routes

// Routes.push({
//   method: 'GET',
//   path: '/{param*}',
//   handler: {
//     directory: {
//       path: '.',
//       redirectToSlash: true,
//       index: true,
//     }
//   }
// })

Routes.push({
  method: 'GET',
  path: '/',
  handler: Handlers.root,
  config: {
    description: 'This redirects to homepage',
    tags : ['template']
  }
})

Routes.push({
  method: 'GET',
  path: '/search',
  handler: Handlers.search,
  config: {
    validate: {
      query: {
        offset: Joi.number().min(0).default(0),
        limit: Joi.number().min(1).max(50).default(5)
      }
    },
    description: 'This loads the homepage',
    notes: 'We worked very hard on this endpoint!!!',
    tags : ['template']
  }
})

Routes.push({
  method: 'GET',
  path: '/search/{id}/{prev}',
  handler: Handlers.getById,
  config: {
    validate: {
      params: {
        id: Joi.string().required(),
        prev: Joi.string()
      }
    },
    description: 'This loads single tweet',
    tags : ['template']
  }
})

Routes.push({
  method: 'POST',
  path: '/create/{prev}',
  config: {
    handler: Handlers.create,
    validate: {
      payload: {
        user: Joi.string().required().min(3).max(255),
        tweet: Joi.string().required().min(2).max(140),
      },
      params: {
        prev: Joi.string()
      }
    },
    description: 'This creates tweet in db',
    notes: 'It is written with promises!!!',
    tags : ['template']
  }
})

Routes.push({
  method: 'POST',
  path: '/update/{id}/{prev}',
  handler: Handlers.update,
  config: {
    validate: {
      params: {
        id: Joi.string().required(),
        prev: Joi.string()
      },
      payload: {
        user: Joi.string().min(3).max(255),
        tweet: Joi.string().min(2).max(140),
      }
    },
    description: 'This updates tweet by its id',
    tags : ['template'],
  }
})

Routes.push({
  method: 'GET',
  path: '/delete/{id}/{prev}',
  handler: Handlers.deleteByID,
  config: {
    validate: {
      params: {
        id: Joi.string().required(),
        prev: Joi.string()
      }
    },
    description: 'This deletes tweet by its id',
    tags : ['template'],
  }
})
