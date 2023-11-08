const Router = require('koa-router')
const router = new Router()
const chat = require('../../db/index')

router.get('/users', (ctx) => {
  ctx.response.body = chat
})

router.post('/users', (ctx) => {
  const data = ctx.request.body
  ctx.response.body = 'users'

  const { name } = data

  if (chat.users.some(user => user.name === name)) {
    ctx.response.status = 400
    ctx.response.body = { status: 'user exists' }

    return
  }

  chat.addUser({ name })
  ctx.response.status = 200
  ctx.response.body = { status: 'OK' }
})

module.exports = router
