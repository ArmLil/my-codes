'use strict'
const fs = require ('fs')
const Templates = require('./templates')
const Database = require('./database')
const Utils = require('./utils')

const FAVICON = './public/tweets.pug'

const Handlers = {}
module.exports = Handlers


Handlers.apiDeleteByIdEndpoint = (req, reply) => {
  console.log('api delete')
  const { id } = req.params
    return Database.deleteUpdateTweet(id)
    .then(reply)
    .catch((err) => {
      reply('Opps '+ err)
      console.error(err)
    })
}

Handlers.apiGetByIdEndpoint = (req, reply) => {
  console.log('api get by id')
  const { id } = req.params
    return Database.getTweetById(id)
    .then((tweet) => reply(tweet))
    .catch((err) => {
      reply('Opps '+ err)
      console.error(err)
    })
}

Handlers.apiUpdateEndpoint = (req, reply) => {
  console.log('api apdate')
  const { payload, params } = req
  console.log(payload, params.id)
  return Database.updateTweets(payload, params.id)
  .then(reply)
  .catch((err) => {
    reply('Opps '+ err)
    console.error(err)
  })
}

Handlers.apiCreateEndpoint = (req, reply) => {
  console.log('api create')
  const { payload, params } = req
  return Database.addTweets(payload)
  .then(reply)
  .catch((err) => {
    reply('Opps '+ err)
    console.error(err)
  })
}

Handlers.apiTweetsEndpoint = (req, reply) => {
  console.log('apiTweetsEndpoint')
  return Database.getTweets()
  .then(reply)
  .catch((err) => {
    reply('Opps '+ err)
    console.error(err)
  })
}

Handlers.rootEndpoint = (req, reply) => {
  console.log('rootEndpoint')
  return Database.getTweets()
  .then(tweets => reply.view('tweets', tweets))
  .catch((err) => {
    reply('Opps '+ err)
    console.error(err)
  })
}

Handlers.createEndpoint = (req, reply) => {
  console.log(req.query)
  return Database.addTweets({tweets: [req.query]})
  .then(reply.redirect('/'))
  .catch((err) => {
    reply('Opps '+ err)
    console.error(err)
  })
}

Handlers.idEndpoint = (req, reply) => {
  const { search, query, path} = req.url
  const { id } = req.params
  //console.log( !search, query, path, {search})
  if (!search) {
    return Database.getTweetById(id)
    .then((tweet) => reply.view('single', tweet))
    .catch((err) => {
      reply('Opps '+ err)
      console.error(err)
    })
  }
  else {
    if (query.delete) {
      return Database.deleteUpdateTweet(id)
      .then(reply.redirect('/'))
      .catch((err) => {
        reply('Opps '+ err)
        console.error(err)
      })
    }
    else if (query.update)
      if(!(query.user || query.tweet)) reply('Please input the data')
      else {
        Database.updateTweets(query, id)
        reply.redirect('/')
      }
    }
}
