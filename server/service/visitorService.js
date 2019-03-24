var visitorDao = require('../dao/visitorDao')
var nodemailer = require('nodemailer')


function sendEmail(data){
    var config = {
        host: 'smtp.163.com',
        port: 465,
        secure: true,
        secureConnection: true,
        auth: {
          user: 'qylbj2016@163.com', 
          pass: 'xinke98211' 
        }
    }
    var transporter = nodemailer.createTransport(config);
    var mail = {
        // 发件人
        from: 'Camy<qylbj2016@163.com>',
        // 主题
        subject: 'Camy博客的验证邮件',
        // 收件人
        to: data.email,
        // 邮件内容，HTML格式
        text: `尊敬的${data.name}，您好！点击链接即可验证您在Camy个人博客的
            评论邮箱,http://localhost:8081/checkEmail?code=945215&email=${data.email}` //接收激活请求的链接
    }
    transporter.sendMail(mail, function(error){
        if(error) {
          return console.log(error);
        }
    });
}
function checkService(response, data){
    var data = JSON.parse( data.toString())
    visitorDao.queryVisitor(response, data, function(res){
        if( res == false ){
            sendEmail(data)
            response.write('邮件已发送到您的邮箱，请及时验证')
        }else{
            response.write('您已经验证过该邮箱了')
        }
        response.end()
    })

}
function insertService(response, email){
    visitorDao.insertVisitor(response, email)
}

module.exports = {
    checkService,
    insertService
}
