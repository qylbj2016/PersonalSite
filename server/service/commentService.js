const commentDao = require('../model/commentDao')

const getComments = blog_id => commentDao.findByFilter(null, { blog_id })

const sendComment = params => commentDao.create( params )

const deleteComment = () => { }

module.exports = {
    getComments,
    sendComment
}