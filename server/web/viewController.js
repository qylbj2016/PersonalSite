var viewService = require('../service/viewService.js')
var url = require('url')
var pathMap = new Map()

function addViews(request, response){

    viewService.addViewsService(response, url.parse(request.url,'true').query.blog_id)
}
function addLikes(request, response){
    
    viewService.addLikesService(response, url.parse(request.url,'true').query.blog_id)
}

pathMap.set('/addViews',addViews)
pathMap.set('/addLikes',addLikes)

module.exports.path = pathMap