const blogService = require('../service/blogService')
const pathMap = new Map()


// 获取文章页标题
const getTitles = async ctx => {
    const title_type = ctx.request.query
    const res = await blogService.getTitles(title_type)
    ctx.body = res
}

//获取文章详情
const getBlogs = async ctx => {
    const blog_id = ctx.request.query
    const res = await blogService.getBlogs(blog_id)
    ctx.body = res 
}

//获取热门标题 (浏览次数最多)
const getHotTitles = async ctx => {
    const limit = ctx.request.query.limit
    const res = await blogService.getHotTitles(limit)
    ctx.body = res 
}

//获取点赞最多的文章 (渲染到首页)
const getLikeBlogs = async ctx => {
    const limit = ctx.request.query.limit
    const res = await blogService.getLikeBlogs(limit)
    ctx.body = res
}

// 点赞
const addLikes = async ctx => {
    const blog_id = ctx.request.query.blog_id
    const num = ctx.request.query.num
    const res = await blogService.addLikes(blog_id, num)
    ctx.body = res
}

// 浏览次数+1
const addViews = async ctx => {
    const blog_id = ctx.request.query.blog_id
    const num = ctx.request.query.num
    const res = await blogService.addViews(blog_id, num)
    ctx.body = res
}

pathMap.set('/getTitles', getTitles)
pathMap.set('/getBlogs', getBlogs)
pathMap.set('/getHotTitles', getHotTitles)
pathMap.set('/getLikeBlogs', getLikeBlogs)
pathMap.set('/addLikes', addLikes)
pathMap.set('/addViews', addViews)

module.exports.path = pathMap