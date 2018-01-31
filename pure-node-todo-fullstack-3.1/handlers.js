'use strict'
const fs = require ('fs')
const Templates = require('./templates')
const Database = require('./database')
const Utils = require('./utils')

const FAVICON = './public/favicon.ico'
const TWEETS_PATH = './tweets.json'

const Handlers = {}
module.exports = Handlers

const fileExists = fs.existsSync(TWEETS_PATH)

Handlers.favicon = (res) => {
  res.writeHead(200, {'Content-Type': 'image/x-icon'} );
  fs.createReadStream(FAVICON).pipe(res);
  res.end();
  return
}

const apiEndpointHandle = (req) => {
  const {url, method } = req
  if (!fileExists) return Utils.dbNotExistResponse()

  const endpoint = url.replace('/api/','')
  const endpointParts = endpoint.split('/')

  // Checking for correct query
  let idString = ''
  if (endpointParts[1]) {
    if (endpointParts[1].includes('?')) {
      idString = endpointParts[1].split('?')[0]
    }
    else idString = endpointParts[1]
  }
  const idNumber = Utils.filterInt(idString)
  //

  if (endpointParts[0] === 'tweets') {
    if (endpointParts.length === 1) {
      if (method === 'POST') {
        return Utils.getBodyObj(req)
        .then((body) => Database.addTweets(body))
        .then((message) => Utils.successTextResponse(message))
      }
      else if (method === 'GET') {
        return Database.tweets()
        .then(tweets => Utils.successGetResponse(JSON.parse(tweets)))
      }
    }
    else if (endpointParts.length === 2 && idNumber) {
      const queryObj = Utils.getQueryObj(url)
      if  (method === 'GET') {
        return Database.getTweetById(idString)
        .then(tweet => Utils.successGetResponse(tweet))
      }
      else if (method === 'PUT') {
        return Utils.getBodyObj(req)
        .then((tweetObj) => {
          const tweet = Object.assign({}, tweetObj.tweets[0], {id:idString})
          return Database.updateTweets(tweet)
        })
        .then((message) => Utils.successTextResponse(message))
      }
      else if (method === 'DELETE' && !queryObj) {
        return Database.deleteTweet(idString)
        .then((message) => Utils.successTextResponse(message))
      }
    }
  }
  return Promise.reject('Bad Request')
}

const rootEndpointHandle = (req) => {
  if (!fileExists) return Utils.dbNotExistResponse()

  const {url, method } = req
  const endpointParts = url.split('/')

  if  (!endpointParts.length === 2) Promise.reject('Bad Request')

  const idString = endpointParts[1].split('?')[0]
  const idNumber = Utils.filterInt(idString)
  const queryObj = Utils.getQueryObj(url)
  if (url === '/') {
    return Database.tweets()
    .then(tweets => {
      if (!tweets) tweets = {tweets:[]}
      tweets = JSON.parse(tweets)
      return Templates.renderHomePage(tweets, 'Get HomePage')
    })
  }
  else if (url.split('?')[0] === '/create') {
    if  (method === 'GET') {
      return Utils.processTweet(queryObj)
      .then(tweet => Database.addTweets(tweet))
      .then(() => Utils.redirectHomeResponse())
    }
  }
  else if (idNumber) {
    if  (!queryObj && method === 'GET') {
      return Database.getTweetById(idString)
      .then((data) => Templates.renderSinglePage(data.tweets[0], 'Get Single'))
    }
    else if (queryObj.delete && method === 'GET') {
      return Database.deleteTweet(idString)
      .then(() => Utils.redirectHomeResponse())
    }
    else if (queryObj.update && method === 'GET') {
      if (queryObj.user || queryObj.tweet) {
        const tweetObj = Object.assign({}, queryObj, {id: idString})
        return Database.updateTweets(tweetObj)
        .then(() => Utils.redirectHomeResponse())
      }
    }
  }
  return Promise.reject('Bad Request')
}

Handlers.requestCheckEndpoint = (req) => {
  
  if (req.url.split('/')[1] === 'api') {
    console.log('DO API related operations here')
    return apiEndpointHandle(req)
  } else {
    console.log('DO "/" related operations here')
    return rootEndpointHandle(req)
  }
}
