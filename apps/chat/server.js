const http = require('http')
const Koa = require('koa')
const koaBody = require('koa-body').default
const router = require('../../routes')
const WS = require('ws')
const chat = require('../../db/index')

const app = new Koa()

app.use(koaBody({
  urlencoded: true,
  multipart: true
}))

app.use(async (ctx, next) => {
  const origin = ctx.request.get('Origin')
  if (!origin) {
    return await next()
  }

  const headers = { 'Access-Control-Allow-Origin': '*' }

  if (ctx.request.method !== 'OPTIONS') {
    ctx.response.set({ ...headers })
    try {
      return await next()
    } catch (e) {
      e.headers = { ...e.headers, ...headers }
      throw e
    }
  }

  if (ctx.request.get('Access-Control-Request-Method')) {
    ctx.response.set({
      ...headers,
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH'
    })

    if (ctx.request.get('Access-Control-Request-Headers')) {
      ctx.response.set('Access-Control-Allow-Headers', ctx.request.get('Access-Control-Request-Headers'))
    }

    ctx.response.status = 204
  }
})

app.use(router())

const server = http.createServer(app.callback())

const port = 8800

const wsServer = new WS.Server({
  server
})

wsServer.on('connection', (ws) => {
  let name = ''
  ws.on('message', (message) => {
    const data = JSON.parse(message.toString())
    data.type = 'msg'

    const sendData = JSON.stringify(data)
    name = data.name
    chat.addMessage({ name: data.name, message: data.message })

    Array.from(wsServer.clients)
      .filter(client => client.readyState === WS.OPEN)
      .forEach(client => client.send(sendData))
  })

  ws.on('close', () => {
    chat.removeUser(name)
    const data = { type: 'users', users: chat.users }
    const sendData = JSON.stringify(data)
    Array.from(wsServer.clients)
      .filter(client => client.readyState === WS.OPEN)
      .forEach(client => client.send(sendData))
  })

  ws.send(JSON.stringify(chat))
})

server.listen(port, (err) => {
  if (err) {
    console.log(err)

    return
  }

  console.log('Server is listening to ' + port)
})