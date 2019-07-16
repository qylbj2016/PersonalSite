const tagService = require('../service/tagService.js')

const pathMap = new Map()

const getTags = async ctx =>  {
   const res = await tagService()
   ctx.body = res
}

pathMap.set('/getTags',getTags)

module.exports.path = pathMap

