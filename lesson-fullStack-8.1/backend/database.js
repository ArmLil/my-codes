'use strict'
const fs = require ('fs')
const Boom = require('boom')

const sqlite3 = require('sqlite3').verbose()

const DB = require('./tweets.sql.js')
const Utils = require('./utils')
const MESSAGES = require('./messages')

const Database = {}
module.exports = Database

//connect to database
const sqlite = new sqlite3.Database('tweets.db', (err) => {
  if (err) {
    console.error(MESSAGES.sqliteDb.error+err.message);
  }
  console.log(MESSAGES.sqliteDb.success)
})

//creates table if db or table not exist
sqlite.run(DB.createTable)

Database.getTweets = (offset, limit) => {
  return new Promise((resolve, reject) => {
    sqlite.all(DB.selectTweets(offset, limit), (err, result) => {
      if(err) return reject(MESSAGES.readFile.error+err.message)
      const tweetsObj = {tweets:result}
      return resolve(tweetsObj)
    })
  })
}

Database.getTweetById = (id) => {
  return new Promise((resolve, reject) => {
    sqlite.get(DB.selectTweetById(id), (err, tweet) => {
      if(err) return reject(MESSAGES.tweet.error+err.message)
      if(!tweet) return resolve(Boom.notFound(MESSAGES.tweet.error))
      return resolve(tweet)
    })
  })
}

Database.addTweet = (tweet) => {
  tweet.colour = Utils.randomColor()
  return new Promise((resolve, reject) => {
    sqlite.run(DB.insert(tweet), (err) => {
      if (err) return reject(MESSAGES.dataPost.error+err.message)
      return resolve(MESSAGES.dataPost.success)
    })
  })
}

Database.updateTweets = (tweet, id) => {
  return new Promise((resolve, reject) => {
    sqlite.run(DB.update(tweet, id), function(err) {
      if(err) return reject(MESSAGES.dataUpdate.error+err.message)
      if(this.changes === 0) return reject(Boom.notFound(MESSAGES.id.error))
      console.log(this.changes)
      return resolve(MESSAGES.dataUpdate.success)
    })
  })
}

Database.deleteUpdateTweet = (id) => {
  return new Promise((resolve, reject) => {
    sqlite.run(DB.deleteUpdate(id), function(err) {
      if(err) return reject(MESSAGES.dataDelete.error+err.message)
      if(this.changes === 0) return reject(MESSAGES.id.error)
      return resolve(MESSAGES.dataDelete.success)
    })
  })
}

Database.countTweets = () => {
  return new Promise((resolve, reject) => {
    sqlite.get(DB.count(), (err, result) => {
      if(err) return reject('count err', err.message)
      return resolve(result.count)
    })
  })
}
