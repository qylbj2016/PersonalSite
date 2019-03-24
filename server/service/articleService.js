var articleDao = require('../dao/articleDao')

function getTitleService(response, type){

    articleDao.queryTitle(response, type)
}
function getArticlesService(response, id){
    articleDao.queryArticle(response, id)
}
function getHotService(response){
    articleDao.queryHotArticle(response)
}
function getLikedArticle(response){
    articleDao.queryLikedArticle(response)
}
module.exports = {
    getTitleService,
    getArticlesService,
    getHotService,
    getLikedArticle
}