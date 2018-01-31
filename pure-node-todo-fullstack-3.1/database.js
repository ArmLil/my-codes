'use strict'
const fs = require ('fs')
const Utils = require('./utils')

const Messages = require('./messages')
const TWEETS_PATH = './tweets.json'

const Database = {}
module.exports = Database

const writeFile = (data, message) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(TWEETS_PATH, data, (err) => {
      if (err) return reject(message.error, err)
    })
    return resolve(message.success)
  })
}

Database.tweets = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(TWEETS_PATH, 'utf8', (err, data) => {
      if (err) return reject(Messages.readFile.error, err)
      resolve(data)
    })
  })
}

Database.tweetsArray = () => {
  return Database.tweets()
  .then((dataFromDb) => {
    let tweetsArray = []
    if (dataFromDb) {
      const newDataFromDb = JSON.parse(dataFromDb)
      tweetsArray = newDataFromDb.tweets
    }
    return tweetsArray
  })
}

Database.addTweets = (reqBody) => {
  return Database.tweetsArray()
  .then((tweetsArray) => Utils.joinTweets(tweetsArray,reqBody.tweets))
  .then((result) => {
    let { notValidTweets, newTweetsObject } = result
    let { message } = Messages.dataPostAdd
    if (notValidTweets) {
      notValidTweets = JSON.stringify(notValidTweets, null, '\t')
      message = Messages.notValidTweets
      message.success += notValidTweets
    }
    newTweetsObject = JSON.stringify(newTweetsObject, null, '\t')
    return writeFile(newTweetsObject, message)
  })
}

Database.updateTweets = (newTweet) => {
  return Database.tweetsArray()
  .then((tweetsArray) => {
    if (!Utils.findTweetById(newTweet.id, tweetsArray))
      return Promise.reject(Messages.id.error)
    let newTweetsArray = Utils.updateTweet(newTweet, tweetsArray)
    const newTweetsObject = {tweets: newTweetsArray.filter(n => n)}
    const result = JSON.stringify(newTweetsObject, null, '\t')
    return writeFile(result, Messages.dataUpdate)
  })
}

Database.deleteTweet = (id) => {
  return Database.tweetsArray()
  .then((tweetsArray) => {
    if (!Utils.findTweetById(id, tweetsArray))
      return Promise.reject(Messages.id.error)
    let newTweetsArray = Utils.deleteTweetById(id, tweetsArray)
    const newTweetsObject = {tweets: newTweetsArray.filter(n => n)}
    const result = JSON.stringify(newTweetsObject, null, '\t')
    return writeFile(result, Messages.dataDelete)
  })
}

Database.getTweetById = (id) => {
  return Database.tweetsArray()
  .then((tweetsArray) => {
    const tweet = Utils.findTweetById(id, tweetsArray)
    if (!tweet) return Promise.reject(Messages.tweet.error)
    return {tweets: [tweet]}
  })
}
