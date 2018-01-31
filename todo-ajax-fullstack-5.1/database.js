'use strict'
const fs = require ('fs')
const sqlite3 = require('sqlite3').verbose()
const Utils = require('./utils')
const MESSAGES = require('./messages')

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

Database.getTweetById = (id) => {
  return new Promise((resolve, reject) => {
    Database.sql.get(`SELECT * from ${DB.tableName} WHERE id=${id}`, (err, tweet) => {
      if(err) return reject(MESSAGES.readFile.error+err)
      return resolve(tweet)
    })
  })
}

Database.addTweets = (tweetsArr) => {
  if(typeof tweetsArr === 'object' && !tweetsArr.tweets) { // this check if its an object
    tweetsArr = Object.assign({}, {tweets: [tweetsArr]})
  }
  const insertValues = tweetsArr.tweets.map((tweet, index) => {
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

Database.updateTweets = (payload, id) => {
  console.log('database updateTweets',payload, id)
  const query = `UPDATE ${DB.tableName} SET user = '${payload.user}', tweet = '${payload.tweet}'  WHERE id = ${id}`

  return new Promise((resolve, reject) => {
    Database.sql.run(query, (err) => {
      if(err) return reject(err)
      return resolve(MESSAGES.dataUpdate.success)
    })
  })
}

Database.deleteTweet = (id) => {
  return new Promise((resolve, reject) => {
    Database.sql.run(`DELETE from ${DB.tableName} WHERE id=${id}`, (err, tweet) => {
      if(err) return reject(MESSAGES.dataDelete.error+err)
      return resolve(MESSAGES.dataDelete.success+err)
    })
  })
}

Database.deleteUpdateTweet = (id) => {
  const updateQuery = (id) => {
    let result = `UPDATE ${DB.tableName} SET `
    result += `deleted_at = '${Utils.dbDate()}' `
    result += `WHERE id = ${id}`
    return result
  }
  return new Promise((resolve, reject) => {
    Database.sql.run(updateQuery(id), (err, tweet) => {
      if(err) return reject(MESSAGES.dataDelete.error+err)
      return resolve(MESSAGES.dataDelete.success)
    })
  })
}
