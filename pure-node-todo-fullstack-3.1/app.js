'use strict'
const http = require('http')
const Handlers = require('./handlers')

const server = http.createServer()

server.on('request', (req, res) => {
  console.log('on server....req=', req.url)
  if (req.url === '/favicon.ico') {
    return Handlers.favicon(res)
  }
  return Handlers.requestCheckEndpoint(req,res)
  .then(response => {
    const { code, message, type, redirect } = response.header

    res.writeHead(code, {'Content-Type': type})

    if (type === 'application/json') {
      res.write(JSON.stringify(response.body, null, '\t'))
    } else if (type === 'text/html' && code === 200) {
      res.write(response.body)
    } else if (type === 'text/plain') {
      res.write(message)
    } else if (code === 302) {
      res.writeHead(302, {
        'Location': redirect
      })
    }
    res.end()
  })
  .catch(error => {
    console.error('Opps,', error)
    res.statusCode = 400
    res.statusMessage = error
    res.end(error)
  })
})

server.listen(3008, () => {
  console.log('server listening on port', server.address().port)
})
