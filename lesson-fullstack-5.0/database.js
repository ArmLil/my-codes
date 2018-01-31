'use strict'
const fs = require ('fs')
const sqlite3 = require('sqlite3').verbose()
const Utils = require('./utils')
const MESSAGES = require('./messages')

const TWEETS_PATH = './tweets.json'
const DB = require('./tweets.sql.js')
const Database = {}
module.exports = Database

//connect to database
Database.sql = new sqlite3.Database('tweets.db', (err) => {
  if (err) {
    return console.error(MESSAGES.sqliteDb.error+err.message);
  }
  console.log(MESSAGES.sqliteDb.success)
})

//creates table if db or table not exist
Database.sql.run(DB.createTable)

Database.getTweets = () => {
  return new Promise((resolve, reject) => {
    Database.sql.all(`SELECT * from ${DB.tableName} WHERE deleted_at IS NULL`, (err, result) => {
      if(err) return reject(MESSAGES.readFile.error+err)
      const tweetsObj = {tweets:result}
      return resolve(tweetsObj)
    })
  })
}

Database.getTweetById = (tweetId) => {
  return new Promise((resolve, reject) => {
    Database.sql.get(`SELECT * from ${DB.tableName} WHERE id=${tweetId}`, (err, tweet) => {
      if(err) return reject(MESSAGES.readFile.error+err)
      return resolve(tweet)
    })
  })
}

Database.addTweets = (tweetsObj) => {
  const insertValues = tweetsObj.tweets.map((tweet, index) => {
    tweet.color = `rgb(${parseInt(Math.random()*300)}, 0, ${parseInt(Math.random()*200)})`
    let result = `('${tweet.user}', '${tweet.tweet}', '${tweet.color}')`
    return result
  })

  return new Promise((resolve, reject) => {
    Database.sql.run(`INSERT INTO ${DB.tableName} (${DB.columns.join(', ')}) VALUES ${insertValues}`, (err) => {
      if (err) return reject(MESSAGES.dataPostAdd.error+err)
      return resolve(MESSAGES.dataPostAdd.success)
    })
  })
}

Database.updateTweets = (newTweet, tweetId) => {
  const updateQuery = () => {
    let result = `UPDATE ${DB.tableName} SET `
    if (newTweet.user && newTweet.tweet) {
      result += `user = '${newTweet.user}', `
      result += `tweet = '${newTweet.tweet}' `
    }
    else if (newTweet.user && !newTweet.tweet) {
      result += `user = '${newTweet.user}' `
    }
    else if (!newTweet.user && newTweet.tweet) {
      result += `tweet = '${newTweet.tweet}' `
    }
    result += `WHERE id = ${tweetId}`
    return result
  }
  Database.sql.run(updateQuery(), (err) => {
    if(err) return Promise.reject((MESSAGES.dataUpdate.error+err))
    return Promise.resolve(MESSAGES.dataUpdate.success)
  })
}

Database.deleteTweet = (tweetId) => {
  return new Promise((resolve, reject) => {
    Database.sql.run(`DELETE from ${DB.tableName} WHERE id=${tweetId}`, (err, tweet) => {
      if(err) return reject(MESSAGES.dataDelete.error+err)
      return resolve(MESSAGES.dataDelete.success+err)
    })
  })
}

Database.deleteUpdateTweet = (tweetId) => {
  const updateQuery = (tweetId) => {
    let result = `UPDATE ${DB.tableName} SET `
    result += `deleted_at = '${Utils.dbDate()}' `
    result += `WHERE id = ${tweetId}`
    return result
  }
  return new Promise((resolve, reject) => {
    Database.sql.run(updateQuery(tweetId), (err, tweet) => {
      if(err) return reject(MESSAGES.dataDelete.error+err)
      return resolve(MESSAGES.dataDelete.success)
    })
  })
}
