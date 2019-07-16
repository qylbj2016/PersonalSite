const nodemailer = require('nodemailer')
const userDao = require('../model/userDao')
const config = require('../config/mail')
const random = require('../util/random')

const checkUserIsExisted = async email => {
    let res = await userDao.findByFilter(['state'], { email })
    res = JSON.parse(JSON.stringify(res))[0]
    if (res) {
        if (res.state === 0) {
            return { isExisted: 'pending' }
        } else {
            return { isExisted: true }
        }
    } else {
        return { isExisted: false }
    }
}

const checkPwdIsTrue = async (email, pwd) => {
    let res = await userDao.findByFilter(['pwd', 'name', 'sex'], { email })
    res = JSON.parse(JSON.stringify(res))[0]
    const imgSrc = `/static/images/visitor${res.sex}.svg`
    return res && res.pwd === pwd ? { isTrue: true, name: res.name, img: imgSrc, email, pwd, } : { isTrue: false }
}

const checkNameIsRepeated = async name => {
    let res = await userDao.findByFilter(['state'], { name })
    res = JSON.parse(JSON.stringify(res))[0]
    return res && res.state === 1 ? { isRepeated: true } : { isRepeated: false }
}

const writeUserInfo = info => userDao.create(info)

const checkCode = async (code, email) => {
    let res = await userDao.findByFilter(['code'], { email })
    res = JSON.parse(JSON.stringify(res))[0]
    if (res && res.code === code) {
        await userDao.update({ state: 1 }, { email })
        return '验证成功'
    } else {
        return '验证失败，如有需要请联系QQ:945215595'
    }
}

const forget = async email => {
    let res = await userDao.findByFilter(['code', 'name'], { email })
    res = JSON.parse(JSON.stringify(res))[0]
    sendEmail({
        to: email,
        text: `尊敬的${res.name}，您好！您的验证码为${res.code}`
    })
}

const registe = async ctx => {
    const query = ctx.request.body
    const { email, name } = query
    const res = await checkUserIsExisted(email)
    if (res.isExisted === 'pending') {
        return '验证邮件早已发送，请您及时查收'
    } else {
        const code = random(6)
        const data = {
            to: email,
            text: `尊敬的${name}，您好！点击链接即可验证您在Cinco个人博客的
            评论邮箱,http://47.105.168.226:8081/users/checkCode?code=${code}&email=${email}` //接收激活请求的链接
        }
        const info = {
            ...query,
            code,
            state: 0   // 0是尚未验证邮箱，但是已经发送邮件，用户数据存入数据库
        }
        writeUserInfo(info)
        sendEmail(data)
        return '已发送邮件到您的邮箱，请您及时验证(可能在垃圾箱里...)'
    }
}

const sendEmail = data => {
    const transporter = nodemailer.createTransport(config)
    const mail = {
        // 发件人
        from: 'Cinco<qylbj2016@163.com>',
        // 主题
        subject: 'Cinco博客的验证邮件',
        // 收件人
        ...data   // to  and  text
    }
    transporter.sendMail(mail, function (error) {
        if (error) {
            return error
        }
    })
}

const upsetPwd = (email, pwd) => userDao.update({ pwd }, { email })

module.exports = {
    checkUserIsExisted,
    checkPwdIsTrue,
    checkNameIsRepeated,
    writeUserInfo,
    registe,
    checkCode,
    forget,
    upsetPwd
}