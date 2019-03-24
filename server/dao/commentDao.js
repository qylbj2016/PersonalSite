var dbutil = require('./dbutil')

function queryComment(response, blog_id){
    var querySql = "select * from comments where blog_id =?"
    var connection = dbutil.createConnection()
    connection.query(querySql, [blog_id], (err,result) => {
        if(err){
            console.log(err)
            throw new Error('数据库查询异常')
        }else{
            response.writeHead(200)
            response.write(JSON.stringify(result))
            response.end()
        }
    })
    connection.end()
}
function insertComment(response, data){
    var insertSql = "INSERT INTO comments (`blog_id`, `user_name`, `email`, `ctime`, `comment`, `parent_name`, `parent`) VALUES (?, ?, ?, ?, ?, ?, ?)"
    var params = [data.blogId, data.name, data.email, data.ctime, data.content, data.parentName, data.parent]
    var connection = dbutil.createConnection()
    connection.query(insertSql, params, (err, result) => {
        if(err){
            console.log(err)
            throw new Error('数据库查询异常')
        }else{
            response.write('')
            response.end()
        }
    })
}

module.exports = {
    queryComment,
    insertComment
}