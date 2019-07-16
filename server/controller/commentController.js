const commentService = require('../service/commentService')
const pathMap = new Map()

// 获取评论
const getComments = async ctx => {
    const blog_id = ctx.request.query.bid
    const res = await commentService.getComments(blog_id)
    ctx.body = res
}

// 发表评论
const sendComment = async ctx => {
    const params = ctx.request.body
    let res = await commentService.sendComment(params)
    console.log(JSON.parse( JSON.stringify (res)))
    ctx.body = true
}
//删除评论

const deleteComment = async ctx => {
    
}


pathMap.set('/getComments', getComments)
pathMap.set('/sendComment', sendComment)
pathMap.set('/deleteComment', deleteComment)

module.exports.path = pathMap