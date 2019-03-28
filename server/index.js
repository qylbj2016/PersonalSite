var express = require('express')
var globalConfig = require('./config/config')
var loader = require('./loader')
var cors = require('cors')
var history = require('connect-history-api-fallback')

var app = new express()

app.use(history())

app.use(express.static('../front/dist'))  // 配置静态资源

app.use(cors()) 

app.post('/getTags',loader.get('/getTags'))

app.get('/getComments',loader.get('/getComments'))
app.post('/sendComment',loader.get('/sendComment'))

app.get('/getTitles',loader.get('/getTitles'))
app.get('/getArticles',loader.get('/getArticles'))
app.get('/getHotArticles',loader.get('/getHotArticles'))
app.get('/getLikedArticles',loader.get('/getLikedArticles'))

app.get('/addViews',loader.get('/addViews'))
app.get('/addLikes',loader.get('/addLikes'))

app.post('/checkVisitor',loader.get('/checkVisitor'))
app.get('/checkEmail',loader.get('/checkEmail'))


app.listen(globalConfig.port, function(){
    console.log('服务已经启动')
})