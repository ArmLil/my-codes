'use strict'
const fs = require ('fs')
const pug = require('pug')

const TWEETS_TEMPLATE = './public/tweets.pug'
const SINGLE_TEMPLATE = './public/single.pug'
const TWEETS_PATH = './tweets.json'

const Templates = {}
module.exports = Templates

Templates.renderHomePage = (tweets, message) => {
  return Promise.resolve(Object.assign({}, {
    body: pug.renderFile(TWEETS_TEMPLATE, tweets)
  }, {
    header: {
      code: 200,
      type: 'text/html',
      message,
    }
  }))
}

Templates.renderSinglePage = (tweet, message) => {
  console.log('........tw', tweet)
  return Promise.resolve(Object.assign({}, {
    body: pug.renderFile(SINGLE_TEMPLATE, tweet)
  }, {
    header: {
      code: 200,
      type: 'text/html',
      message,
    }
  }))
}
