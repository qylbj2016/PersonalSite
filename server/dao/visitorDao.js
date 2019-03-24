var dbutil = require('./dbutil')

function queryVisitor(response, data, callback){
    var querySql = "select * from visitor where email= ?" 
    var connection = dbutil.createConnection()
    connection.query(querySql, [data.email], (err,result) => {
        if(err){
            console.log(err)
            throw new Error('数据库查询异常')
        }else{
            response.setHeader("Content-Type", "text/html;charset=utf-8")
            response.writeHead(200)
            callback(result)
        }
    })
    connection.end()
}
function insertVisitor(response, email){
    var insertSql = "INSERT INTO visitor (`email`) VALUES (?)"
    var connection = dbutil.createConnection()
    connection.query(insertSql, [email], (err, result) => {
        if(err){
            console.log(err)
            throw new Error('数据库查询异常')
        }else{
            response.setHeader("Content-Type", "text/html;charset=utf-8")
            response.writeHead(200)
            response.write('验证成功')
            response.end()
        }
    })
}

module.exports = {
    queryVisitor,
    insertVisitor
}