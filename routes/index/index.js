const Router = require('koa-router')
const router = new Router()

router.get('/index', async (ctx) => {
  ctx.response.body = { string: 'Привет, мир!', status: 'OkaY' }
})

module.exports = router
