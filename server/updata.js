var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: '3306',
  database: 'app'
})

connection.connect()

var modSql = 'UPDATE user_acc SET password = ? WHERE  account= ? AND tel= ?'
var modSqlParams = ['UPDATE->success', 'skybluezvvvvdd', '131 3150 3525']
// 改
connection.query(modSql, modSqlParams, function(err, result) {
  if (err) {
    console.log('[UPDATE ERROR] - ', err.message)
    return
  }
  console.log('--------------------------UPDATE----------------------------')
  console.log('UPDATE affectedRows', result.affectedRows)
  console.log('-----------------------------------------------------------------\n\n')
})

connection.end()
