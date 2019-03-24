var mysql = require('mysql')

function createConnection(){
    var connection = mysql.createConnection({
        host: "47.105.168.226",
        port: "3306",
        user: "root",
        password: "XinKe98211.",
        database: "blog"
    })
    return connection
}

module.exports.createConnection = createConnection