var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'jsdb'
})

connection.connect()
var sql = 'select * from user where account = ? and password = ?'
// 查
connection.query(sql, ['123456789', '52'], function(err, result) {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message)
    return
  } else if (result === '') {
    console.log('登录失败')
  }
  console.log('--------------------------SELECT----------------------------')
  console.log(result)
  console.log(
    '------------------------------------------------------------\n\n'
  )
})

connection.end()
