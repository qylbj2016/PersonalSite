const router = require('koa-router')()
const loader = require('../util/loader')


router.get('/getTags', loader.get('/getTags'))


router.get('/addLikes', loader.get('/addLikes'))
router.get('/addViews', loader.get('/addViews'))


router.get('/getTitles', loader.get('/getTitles'))
router.get('/getHotTitles', loader.get('/getHotTitles'))


router.get('/getBlogs', loader.get('/getBlogs'))
router.get('/getLikeBlogs', loader.get('/getLikeBlogs'))


router.get('/getComments', loader.get('/getComments'))
router.post('/sendComment', loader.get('/sendComment'))


module.exports = router
