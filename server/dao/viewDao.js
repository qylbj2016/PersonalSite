var dbutil = require('./dbutil')

function updatedViews(response, blog_id){
    var updatedSql = "update blog set views = views + 1 where blog_id = ?"
    var connection = dbutil.createConnection()
    connection.query (updatedSql, [blog_id], (err) =>{
        if(err){
            console.log(err)
            throw new Error('数据库查询异常')
        }else{
            response.writeHead(200)
            response.end()
        }
    }) 
    connection.end()
}
function updatedLikes(response, blog_id){
    var updatedSql = "update blog set islike = islike + 1 where blog_id = ?"
    var connection = dbutil.createConnection()
    connection.query (updatedSql, [blog_id], (err) =>{
        if(err){
            console.log(err)
            throw new Error('数据库查询异常')
        }else{
            response.writeHead(200)
            response.end()
        }
    }) 
    connection.end()
}

module.exports = {
    updatedViews,
    updatedLikes
}