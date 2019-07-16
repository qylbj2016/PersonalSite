const blogDao = require('../model/blogDao')

const titleAttrs = ['views','title','tag','ctime','blog_id'] 

const getTitles = async title_type => {
    if( title_type.type === 'all'){
        return blogDao.findAll( titleAttrs )
    }else if( title_type.type === 'else' ){
        return blogDao.findByFilter(titleAttrs, { tag : 'js' })
    }else{
        return blogDao.findByFilter(titleAttrs, { tag : title_type.type })
    }
}

const getBlogs = blog_id => blogDao.findByFilter(null, blog_id)

const getHotTitles = limit => blogDao.findByOrderLimited(titleAttrs, 'views', limit)

const getLikeBlogs = limit => blogDao.findByOrderLimited(null, 'islike', limit)

const addLikes = async ( blog_id, num ) => blogDao.update({ islike: num }, { blog_id })

const addViews = async ( blog_id, num ) => blogDao.update({ views: num }, { blog_id })

module.exports = {
    getTitles,
    getBlogs,
    getHotTitles,
    getLikeBlogs,
    addLikes,
    addViews
}