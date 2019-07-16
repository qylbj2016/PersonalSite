const userService = require('../service/userService')
const pathMap = new Map()


// 验证用户是否存在
const checkUserIsExisted = async ctx => {
    const email = ctx.request.query.email
    const res = await userService.checkUserIsExisted(email)
    ctx.body = res
}

// 验证密码是否正确
const checkPwdIsTrue = async ctx => {
    const { email, pwd } = ctx.request.body
    let res = null
    const temp = await userService.checkUserIsExisted(email)
    if( temp.isExisted ){
        res = await userService.checkPwdIsTrue(email, pwd)
    }else{
        res = temp
    }
    ctx.body = res
}

// 验证用户名是否已经被注册
const checkNameIsRepeated = async ctx => {
    const name = ctx.request.query.name
    const res = await userService.checkNameIsRepeated(name)
    ctx.body = res
}

// 验证用户邮箱
const registe = async ctx => {
    const res = await userService.registe(ctx)
    ctx.body = res
}
const checkCode = async ctx => {
    const { code, email } = ctx.request.query
    const res = await userService.checkCode(code, email)
    ctx.body = res
}

const forget = async ctx => {
    const email = ctx.request.query.email
    const res = await userService.forget(email)
    ctx.body = res
}
const upsetPwd = async ctx => {
    const { email, code, pwd } = ctx.request.body
    const res = await userService.checkCode(code, email)
    if( JSON.parse( JSON.stringify( res )) ){
        await userService.upsetPwd(email, pwd)
        ctx.body = true
    }else{
        ctx.body = false
    }
}

pathMap.set('/checkUserIsExisted', checkUserIsExisted)
pathMap.set('/checkPwdIsTrue', checkPwdIsTrue)
pathMap.set('/checkNameIsRepeated', checkNameIsRepeated)
pathMap.set('/registe', registe)
pathMap.set('/checkCode', checkCode)
pathMap.set('/forget', forget)
pathMap.set('/upsetPwd', upsetPwd)


module.exports.path = pathMap