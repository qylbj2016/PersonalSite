const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyBody = require('koa-body')
const logger = require('koa-logger')
const cors = require('koa2-cors')

const index = require('./routes/index')
const users = require('./routes/users')

const globalConfig = require('./config/server/config')

//error handler
onerror(app)


app.use(cors({
  origin: function(ctx) {
    return 'http://47.105.168.226:8080'
  }
}))

// middlewares
app.use(bodyBody({
  multipart: true,
  formidable: {
    uploadDir: globalConfig['img_path'],
    keepExtensions: true,
    maxFieldsSize: 2 * 102 * 1024
  }
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/dist/static'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});


module.exports = app
