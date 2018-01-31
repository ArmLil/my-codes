'use strict'

const Utils = {}
module.exports = Utils

Utils.getQueryObj = (url) => {
  let params = url.split('?')[1]
  if (!params) return null
  params = params.split('&')
  let obj = {}
  let queryObj = {}
  params.forEach(param => {
    const clean = param.split('=')
    if (!clean[1]) return
    const value = clean[1].replace(/\+/g, ' ')
    obj = {[clean[0]] : value}
    queryObj = Object.assign(queryObj, obj)
  })
  return queryObj
}

Utils.getBodyObj = (req) => {
  let body = []
  return new Promise((resolve, reject) => {
    req.on('data', (chunk) => {
      body.push(chunk)
      body = Buffer.concat(body).toString()
    });
    req.on('end', () => {
      return resolve(JSON.parse(body))
    })
    req.on('error', (e) => { return reject(e.message) })
  })
}

Utils.findTweetById = (id, tweetsArray) => {
  let result = null
  tweetsArray.forEach(oldTweet => {
    if (id === oldTweet.id) {
       result = oldTweet
    }
  })
 return result
}

Utils.deleteTweetById = (id, tweetsArray) => {
  tweetsArray = tweetsArray.map(oldTweet => {
    if (id === oldTweet.id) {
      return null
    }
    return oldTweet
  })
 return tweetsArray
}

Utils.updateTweet = (newTweet, tweetsArray) => {
  tweetsArray = tweetsArray.map(oldTweet => {
    if (newTweet.id === oldTweet.id) {
      return Object.assign({}, oldTweet, newTweet)
    }
    return oldTweet
  })
 return tweetsArray
}

Utils.filterInt = (value) => {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
}

Utils.processTweet = (tweet) => {
  const id = `${new Date().valueOf()}`
  tweet.id = id
  tweet.colour = `rgb(${parseInt(Math.random()*300)}, 0, ${parseInt(Math.random()*200)})`
  const newTweetsObject = {tweets: [tweet]}
  return Promise.resolve(newTweetsObject)
}

const IsUnicId = (id, tweets) => {
  let idIsUnic = true
  tweets.forEach(tweet => {
    if (tweet.id === id) {
      idIsUnic = false
      return
    }
  })
  return idIsUnic
}

const checkTweetsId = (tweetsFromDb, newTweets) => {
  const notValidTweets = []
  const validTweets = newTweets.map(tweet => {
    const isUnic = IsUnicId(tweet.id, tweetsFromDb)
    if (!isUnic) {
      notValidTweets.push(tweet)
      return null
    } else if (isUnic){
      return tweet
    }
  })
  return { notValidTweets, validTweets }
}

Utils.joinTweets = (tweetsFromDb, bodyArray) => {
  const checkedTweets = checkTweetsId(tweetsFromDb, bodyArray)
  let { notValidTweets, validTweets } = checkedTweets
  let newTweetsArray = tweetsFromDb.concat(validTweets)
  const newTweetsObject = {tweets: newTweetsArray.filter(n => n)}
  return Promise.resolve({ notValidTweets, newTweetsObject})
}

Utils.dbNotExistResponse = () => {
  return Promise.resolve(Object.assign({}, {
    header: {
      code: 404,
      type: 'text/plain',
      message: 'No Content/Database does not exist...',
    }
  }))
}

Utils.successGetResponse = (tweets) => {
  return Promise.resolve(Object.assign({}, {
    body: tweets
  }, {
    header: {
      code: 200,
      type: 'application/json',
      message: 'GET request',
    }
  }))
}

Utils.successTextResponse = (message) => {
  return Promise.resolve(Object.assign({}, {
    body: {
      message,
    }
  }, {
    header: {
      code: 201,
      type: 'text/plain',
      message,
    }
  }))
}

Utils.redirectHomeResponse = () => {
  return Promise.resolve(Object.assign({}, {
    header: {
      code: 302,
      type: 'text/html',
      message: 'Redirect',
      redirect: '/'
    }
  }))
}
