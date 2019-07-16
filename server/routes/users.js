const router = require('koa-router')()
const loader = require('../util/loader')

router.prefix('/users')


// 检测是否重名
router.get('/name', loader.get('/checkNameIsRepeated'))
// 检测邮箱是否被注册
router.get('/user', loader.get('/checkUserIsExisted'))
// 验证邮箱
router.post('/email', loader.get('/registe') )
// 验证码检测
router.get('/checkCode', loader.get('/checkCode'))
// 登陆密码检测
router.post('/pwd', loader.get('/checkPwdIsTrue'))
// 忘记密码
router.get('/forget', loader.get('/forget'))
// 修改密码
router.post('/upsetPwd', loader.get('/upsetPwd'))


module.exports = router
