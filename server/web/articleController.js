var articleService = require('../service/articleService')
var url = require('url')

var pathMap = new Map();

function getTitles(request,response){
    articleService.getTitleService(response, url.parse(request.url,'true').query.type)
    
}

function getArticles(request,response){
    articleService.getArticlesService(response, url.parse(request.url,'true').query.id)
    
}
function getHotArticles(request,response){
    articleService.getHotService(response)
}
function getLikedArticles(request,response){
    articleService.getLikedArticle(response)
}

pathMap.set('/getTitles',getTitles)
pathMap.set('/getArticles',getArticles)
pathMap.set('/getHotArticles',getHotArticles)
pathMap.set('/getLikedArticles',getLikedArticles)

module.exports.path = pathMap