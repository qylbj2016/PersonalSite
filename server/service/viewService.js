var viewDao = require('../dao/viewDao')

function addViewsService(response, blog_id){

    viewDao.updatedViews(response, blog_id)
}

function addLikesService(response, blog_id){

    viewDao.updatedLikes(response, blog_id)
}

module.exports = {
    addViewsService,
    addLikesService
}