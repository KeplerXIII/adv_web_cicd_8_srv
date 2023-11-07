const Router = require('koa-router')
const router = new Router()

router.get('/index', async (ctx) => {
  const response = { string: 'Привет, мир!', status: 'OkaY' }
  ctx.response.body = JSON.stringify(response)
})

module.exports = router
