var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'app'
})

connection.connect()
var sql = "SELECT * from tabledata where position(? in `?`)"
var mysql = "select * from user_acc where account = ? AND tel= ?"
    // 查
var option = 'h_create_id';
var value = 10;
//var values = "%" + value + "%";
//console.log(values)
connection.query(sql, [value, option], function(err, result) {
    if (err) {
        console.log('[SELECT ERROR] - ', err.message)
        return
    }
    console.log('--------------------------SELECT----------------------------')
    console.log(`result.length:${result.length}`)
    console.log(
        '------------------------------------------------------------\n\n'
    )
})

connection.end()