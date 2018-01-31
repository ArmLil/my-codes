'use strict'
const Boom = require('boom')

const Database = require('./database')
const Utils = require('./utils')
const MESSAGES = require('./messages')

const Api = {}
module.exports = Api

Api.search = (req, reply) => {
  const { offset, limit } = req.query
  if (offset % limit !== 0)
    return reply(Boom.badRequest(MESSAGES.offset.error))
  let pagination = {}
  return Database.countTweets()
    .then((count) => {
      pagination = Object.assign(
        {},
        {offset},
        {limit},
        {count},
      )
    })
    .then(() => Database.getTweets(offset, limit))
    .then((tweets) => Object.assign({}, pagination, tweets))
    .then(reply)
    .catch((err) => reply(Utils.handleBoom(err)))
  }

Api.create = (req, reply) => {
  const { payload } = req
  return Database.addTweet(payload)
    .then(reply)
    .catch((err) => reply(Utils.handleBoom(err)))
}

Api.deleteById = (req, reply) => {
  const { id } = req.params
  return Database.deleteUpdateTweet(id)
    .then(reply)
    .catch((err) => reply(Utils.handleBoom(err)))
}

Api.getById = (req, reply) => {
  const { id } = req.params
  return Database.getTweetById(id)
    .then((tweet) => reply(tweet))
    .catch((err) => reply(Utils.handleBoom(err)))
}

Api.update = (req, reply) => {
  const tweet = req.payload
  const id = req.params.id
  return Database.updateTweets(tweet, id)
    .then(reply)
    .catch((err) => reply(err))
}

Api.count = (req, reply) => {'hello'}
