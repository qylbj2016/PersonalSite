var commentDao = require('../dao/commentDao')
var visitorDao = require('../dao/visitorDao')

function getService(response, blog_id){

    commentDao.queryComment(response, blog_id)
}

function sendService(response, data){
    var data = JSON.parse( data.toString())
    visitorDao.queryVisitor(response, data, function(res){
        if( res == false ){
            response.write('请您先验证邮箱')
            response.end()
        }else{
            commentDao.insertComment( response, data )
        }
    })
}

module.exports = {
    getService,
    sendService
}
