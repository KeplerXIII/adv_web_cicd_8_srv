const combineRouters = require('koa-combine-routers')

const index = require('./index/index.js')
const users = require('./users/index.js')

const router = combineRouters(
  index,
  users
)

module.exports = router
