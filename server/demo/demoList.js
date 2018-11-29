var mysql = require('mysql')
var $conf = require('../config/listDB')
var $sql = require('./listSql')

// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql)
var errLog = function(err) {
        console.log(`数据库错误:${err.message}`) // 控制台输出错误
    }
    // 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        })
    } else {
        res.json(ret)
    }
}

module.exports = {
    queryAll: function(req, res, next) {
        // 查询所有用户
        pool.getConnection(function(err, connection) {
            if (err) {
                errLog(err)
            } else {
                connection.query($sql.queryAll, (err, result) => {
                    if (err) {
                        errLog(err)
                    } else {
                        jsonWrite(res, result) // 以json形式，把操作结果返回给前台页面
                        connection.release() // 释放连接
                    }
                })
            }
        })
    },
    queryLimit: function(req, res, next) {
        // 查询所有用户
        pool.getConnection(function(err, connection) {
            if (err) {
                errLog(err)
            } else {
                var data = req.body
                console.log(data)
                connection.query($sql.queryLimit, [data.start, data.end], (err, result) => {
                    if (err) {
                        errLog(err)
                    } else {
                        jsonWrite(res, result) // 以json形式，把操作结果返回给前台页面
                        connection.release() // 释放连接
                    }
                })
            }
        })
    },
    queryLength: function(req, res, next) {
        // 查询所有用户
        pool.getConnection(function(err, connection) {
            if (err) {
                errLog(err)
            } else {
                connection.query($sql.queryLength, (err, result) => {
                    if (err) {
                        errLog(err)
                    } else {
                        jsonWrite(res, result) // 以json形式，把操作结果返回给前台页面
                        connection.release() // 释放连接
                    }
                })
            }
        })
    }
}