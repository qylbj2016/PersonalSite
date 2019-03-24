var tagService = require('../service/tagService')

var pathMap = new Map()

function getTags(request, response){

    tagService(response)
}

pathMap.set('/getTags',getTags)

module.exports.path = pathMap

