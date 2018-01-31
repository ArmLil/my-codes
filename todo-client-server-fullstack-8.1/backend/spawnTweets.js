'use strict'

const sqlite3 = require('sqlite3').verbose()

const DB = require('./tweets.sql.js')
const Utils = require('./utils')
const MESSAGES = require('./messages')

const TABLE_NAME = 'tweetsTable'
const COLUMNS = ['user', 'tweet', 'colour']

const spawnTweetsQuery = (i) => {
  let values = `('user${i}', 'tweet${i}', '${Utils.randomColor()}')`
  return `
  INSERT INTO ${TABLE_NAME}
  (${COLUMNS.join(', ')})
  VALUES ${values}`
}

const sqliteDb = new sqlite3.Database('tweets.db', (err) => {
  if (err) {
    return reject(MESSAGES.sqliteDb.error.message, err)
  }
  console.log(MESSAGES.sqliteDb.success, sqliteDb )
})

//creates table if db or table not exist
setTimeout(() => {
  sqliteDb.run(DB.createTable)
  console.log(TABLE_NAME)
}, 100)

setTimeout(() => {
  for  (let i = 0; i < 200; i++) {
    setTimeout(() => {
      sqliteDb.run(spawnTweetsQuery(i), (err) => {
        if (err) return reject(err.message)
      })
    }, i * 100)
  }
}, 2000)



const countTweets = () => {
  return new Promise((resolve, reject) => {
    sqliteDb.get(`SELECT COUNT(*) AS count FROM ${TABLE_NAME}`, (err, result) => {
      if(err) return reject('count err', err)
      return resolve(result)
    })
  })
}

  // return countTweets()
  // .then((result) => {
  //   console.log(result.count)
  // })


  // const closeDb = () => {
  //   console.log("closeDb");
  //   sqliteDb.close();
  // }
