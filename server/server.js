// ssr-server.js
const globalConfig = require('./config/server/config')
const Koa = require('koa')
const path = require('path')
const server = new Koa()
const { createBundleRenderer } = require('vue-server-renderer')
const { minify } = require('html-minifier')
const templateHtml = require('fs').readFileSync(path.resolve(__dirname, './index.template.html'), 'utf-8')

let distPath = './dist'

const renderer = createBundleRenderer(require(`${distPath}/vue-ssr-server-bundle.json`), { 
  runInNewContext: false,
  template: templateHtml, 
  clientManifest: require(`${distPath}/vue-ssr-client-manifest.json`) 
})

server.use(require('koa-static')(__dirname + '/dist'))

server.use(async ( ctx, next ) => {
  const context =  { url: ctx.req.url, pageTitle: 'default-title' }
  if (/\.\w+$/.test(context.url)) {
    return next
  }
  return new Promise((resolve, reject) => {
    renderer.renderToString(context, function (err, html) {
      if (err) {
        console.log(err)
        return reject(err)
      }
      ctx.status = 200
      ctx.type = 'text/html; charset=utf-8'
      const res = minify(html, { collapseWhitespace: true, minifyCSS: true, minifyJS: true})
      ctx.body = res
      resolve(res)
    })
  })
})

// 错误处理
server.on('error', function (err) {
  console.log(err)
})

server.listen(globalConfig.ssr_server_port)
