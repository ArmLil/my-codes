'use strict'
const querystring = require('querystring');
const Request = require('request-promise')
const Boom = require('boom')

const TWEET_ROOT = `http://localhost:4000/api/tweets`

const Handlers = {}
module.exports = Handlers

const validatePagination = (req, reply) => {
  let { offset, limit } = req.query
  if (offset % limit !== 0) {
    req.query.offset -= offset % limit
    const queryString = querystring.stringify(req.query)
    return reply.redirect(`/search?${queryString}`)
  }
}

Handlers.root = (req, reply) => {
  reply.redirect('/search')
}

Handlers.search = (req, reply) => {
  let { offset, limit } = req.query
  if (offset % limit !== 0) {
    req.query.offset -= offset % limit
    const queryString = querystring.stringify(req.query)
    return reply.redirect(`/search?${queryString}`)
  }
  const uri = TWEET_ROOT
  const options = {
    uri,
    qs: req.query,
    json: true,
  }
 return Request(options)
  .then((result) => reply.view('tweets', result))
  .catch((err) => reply(Boom.badRequest(err.message)))
}

Handlers.create = (req, reply) => {
  const { payload, params } = req
  const uri = TWEET_ROOT
  const options = {
    method: 'POST',
    uri,
    body: payload,
    json: true
  }
  return Request(options)
    .then(reply.redirect(`/search?${params.prev}`))
    .catch((err) => reply(Boom.badRequest(err.message)))
}

Handlers.update = (req, reply) => {
  const { payload, params } = req
  const { id } = params
  let uri = TWEET_ROOT
  uri += `/${id}`
  const options = {
    method: 'PUT',
    uri,
    body: payload,
    json: true
  }
  return Request(options)
    .then(reply.redirect(`/search?${params.prev}`))
    .catch((err) => reply(Boom.badRequest(err.message)))
}

Handlers.deleteByID = (req, reply) => {
  const { params } = req
  const { id } = params
  let uri = TWEET_ROOT
  uri += `/${id}`
  const options = {
    method: 'DELETE',
    uri,
    json: true
  }
  return Request(options)
    .then(reply.redirect(`/search?${params.prev}`))
    .catch((err) => reply(Boom.badRequest(err.message)))
}

Handlers.getById = (req, reply) => {
  const { params } = req
  const { id, prev } = params
  let uri = TWEET_ROOT
  uri += `/${id}`
  const options = {
    method: 'GET',
    uri,
    json: true
  }
  return Request(options)
    .then((tweet) => reply.view('single', Object.assign(tweet, {prev})))
    .catch((err) => reply(Boom.badRequest(err.message)))
}
