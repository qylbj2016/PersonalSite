var commentService = require('../service/commentService.js')
var url = require('url')

var pathMap = new Map()

function getComments(request, response){
    commentService.getService(response, url.parse(request.url,'true').query.bid)

}

function sendComment(request, response){
    request.on('data', data => commentService.sendService(response,data))
}

pathMap.set('/getComments',getComments)
pathMap.set('/sendComment',sendComment)

module.exports.path = pathMap

