var tagDao = require('../dao/tagDao')

function tagService(response){
    tagDao.getTags(response)
}


module.exports = tagService