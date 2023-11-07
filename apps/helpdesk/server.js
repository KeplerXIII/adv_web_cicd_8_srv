const http = require('http')
const Koa = require('koa')
const koaBody = require('koa-body').default

const app = new Koa()

app.use(koaBody({
  urlencoded: true,
  multipart: true
}))

app.use(async ctx => {
  ctx.response.set('Access-Control-Allow-Origin', '*')
  ctx.response.set('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  console.log(ctx.body)

  ctx.response.body = 'hell man'
  ctx.response.status = 200
})

const server = http.createServer(app.callback())

const port = 8800

server.listen(port, (err) => {
  if (err) {
    console.log(err)

    return
  }

  console.log('Server is listening to ' + port)
})
