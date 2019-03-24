var dbutil = require('./dbutil')

function getTags(response){
    var querySql = "select tag, type from tags"
    var connection = dbutil.createConnection()
    connection.query(querySql, (err,result) => {
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

module.exports = {
    getTags,
}