var visitorService = require('../service/visitorService.js')
var url = require('url')
var pathMap = new Map()

function checkVisitor(request, response){
    request.on('data', data => visitorService.checkService(response,data,1))
}
function checkEmail(request, response){
    if(url.parse(request.url,'true').query.code === '945215'){
        visitorService.insertService(response, url.parse(request.url,'true').query.email)
    }
}

pathMap.set('/checkVisitor',checkVisitor)
pathMap.set('/checkEmail',checkEmail)

module.exports.path = pathMap