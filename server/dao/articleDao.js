var dbutil = require('./dbutil')

function queryTitle(response, type){
    if(type === 'all'){
        var querySql = "select title, tag, views, ctime, blog_id, islike from blog"
    }else{
        var querySql = "select title, tag, views, ctime, blog_id, islike from blog where tag = ?"
    }
    var connection = dbutil.createConnection()
    connection.query(querySql, type, (err,result) => {
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
function queryHotArticle(response){
    var querySql = "select title, views, tag, blog_id, ctime from blog order by views desc  limit 0, 6"
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

function queryLikedArticle(response){
    var querySql = "select * from blog order by islike desc "
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
function queryArticle(response, blog_id){
    if(blog_id === 0){
        var querySql = "select * from blog"
    }else{
        var querySql = "select * from blog where blog_id = ?"
    }
    var connection = dbutil.createConnection()
    connection.query(querySql, blog_id, (err,result) => {
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
    queryTitle,
    queryArticle,
    queryHotArticle,
    queryLikedArticle
}