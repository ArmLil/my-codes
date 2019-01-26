'use strict'
const Boom = require('boom')
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
    .catch((err) => reply('Opps '+ err))
}

Handlers.apiGetByIdEndpoint = (req, reply) => {
  console.log('api get by id')
  const { id } = req.params
    return Database.getTweetById(id)
    .then((tweet) => reply(tweet))
    .catch((err) => reply('Opps '+ err))
}

Handlers.apiUpdateEndpoint = (req, reply) => {
  console.log('api apdate')
  const { payload, params } = req
  console.log('payload',payload, 'id',params.id)
  return Database.updateTweets(payload, params.id)
  .then(reply)
  .catch((err) => reply('Opps ' + err))
}

Handlers.apiCreateEndpoint = (req, reply) => {
  console.log('api create')
  const { payload } = req
  return Database.addTweets(payload)
  .then(reply)
  .catch((err) => reply('Opps ' + err))
}

Handlers.apiTweetsEndpoint = (req, reply) => {
  return Database.getTweets()
  .then(reply)
  .catch((err) => reply('Opps ' + err))
}

Handlers.rootEndpoint = (req, reply) => {
  console.log('rootendpoint');
  return Database.getTweets()
  .then(tweets => {
    console.log('rootendpoint',tweets);
    reply.view('tweets', tweets)
  })
  .catch((err) => reply('Opps ' + err))
}

Handlers.createEndpoint = (req, reply) => {
  const tweet = {
    user: req.payload.user,
    tweet: req.payload.tweet,
  }

  return Database.addTweets({tweets: [tweet]})
  .then(reply.redirect('/'))
  .catch((err) => reply(Boom.badRequest(err)))
}

Handlers.updateEndpoint = (req, reply) => {
  const tweet = {
    user: req.payload.user,
    tweet: req.payload.tweet,
  }

  const { id } = req.params

  return Database.updateTweets(tweet.user, tweet.tweet, id)
  .then(reply.redirect('/'))
  .catch((err) => {
    return reply(Boom.badRequest(err))
  })
}

Handlers.deleteEndpoint = (req, reply) => {
  const { id } = req.params

  return Database.deleteUpdateTweet(id)
  .then(reply.redirect('/'))
  .catch((err) => reply(Boom.badRequest(err)))
}

Handlers.getEndpoint = (req, reply) => {
  const { id } = req.params
  return Database.getTweetById(id)
    .then((tweet) => reply.view('single', tweet))
    .catch((err) => reply(Boom.badRequest(err)))
}
