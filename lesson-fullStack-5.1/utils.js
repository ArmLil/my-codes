'use strict'

const Utils = {}
module.exports = Utils

Utils.getQueryObj = (url) => {
  let params = url.split('?')[1]
  if (!params) return null
  params = params.split('&')
  let obj = {}
  let queryObj = {}
  params.map(param => {
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

Utils.filterInt = (value) => {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
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

Utils.dbDate = (date) => {
  const d = date || new Date()

  const F = d.getUTCFullYear()
  const M = d.getUTCMonth()
  const D = d.getUTCDate()
  const H = d.getUTCHours()
  const Min = d.getUTCMinutes()
  const S = d.getUTCSeconds()

  return `${F}-${M}-${D} ${H}:${Min}:${S}`
}
