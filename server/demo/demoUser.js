var mysql = require('mysql')
var $conf = require('../config/demoDB')
var $sql = require('./demoSql')

// 使用连接池，提升性能
var pool = mysql.createPool($conf.mysql)

var timer = function() {
    const date = new Date()
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    const now_time = (`${year}.${month}.${day} ${hour}:${minute}:${second}`)
    return now_time
}
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
    // 验证并注册
    userReg: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            // 查询
            if (err) {
                errLog(err)
            } else {
                var data = req.body
                connection.query($sql.login.firstcheck, [data.account], (err, result) => {
                    if (err) {
                        errLog(err)
                    } else if (result.length > 0) {
                        result = {
                            code: 5,
                            msg: '该账号已存在!'
                        }
                        jsonWrite(res, result) // 以json形式，把操作结果返回给前台页面
                    } else {
                        console.log(`账号:${data.account} && 密码:${data.password} && 邀请码:${data.invcode}  注册时间:  ${timer()} `)
                        connection.query($sql.insert, [data.nickname, data.account, data.password, timer(), data.tel, data.email, data.invcode], function(err, result) {
                            if (err) {
                                errLog(err)
                            } else {
                                if (result) {
                                    result = {
                                        code: 156,
                                        msg: '注册成功'
                                    }
                                }
                                jsonWrite(res, result) // 以json形式，把操作结果返回给前台页面
                            }
                        })
                    }
                    connection.release() // 释放连接
                })
            }
        })
    },
    userLogin: function(req, res, next) {
        // 验证并登录
        pool.getConnection(function(err, connection) {
            if (err) {
                errLog(err)
            } else {
                var data = req.body
                connection.query($sql.login.firstcheck, [data.account], (err, result) => {
                    if (err) {
                        errLog(err)
                    } else {
                        if (result.length === 0) {
                            result = {
                                code: -1,
                                msg: '没有该账号!'
                            }
                            jsonWrite(res, result) // 以json形式，把操作结果返回给前台页面
                        } else {
                            connection.query($sql.login.secondcheck, [data.account, data.password], (err, result) => {
                                if (err) {
                                    errLog(err)
                                } else {
                                    if (result.length === 0) {
                                        result = {
                                            code: 0,
                                            msg: '密码错误!'
                                        }
                                    } else {
                                        console.log(`${data.account} && ${data.password}  登录时间:  ${timer()} `)
                                        result = {
                                            code: 100,
                                            msg: '登录成功!'
                                        }
                                    }
                                    jsonWrite(res, result) // 以json形式，把操作结果返回给前台页面
                                }
                            })
                        }
                        connection.release() // 释放连接
                    }
                })
            }
        })
    },
    queryAll: function(req, res, next) {
        // 查询所有用户
        pool.getConnection(function(err, connection) {
            if (err) {
                errLog(err)
            } else {
                console.log(`查询时间:  ${timer()}`) // nodejs服务端需要通过'bodyParser.json()'解析Request参数"
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
    retrievePass: function(req, res, next) {
        // 找回密码
        pool.getConnection(function(err, connection) {
            if (err) {
                errLog(err)
            } else {
                var data = req.body
                connection.query($sql.retrievePass.verificatacc, [data.account], (err, result) => {
                    if (err) {
                        errLog(err)
                    } else {
                        if (result.length === 0) {
                            result = {
                                code: -1,
                                msg: '没有该账号!'
                            }
                            jsonWrite(res, result) // 以json形式，把操作结果返回给前台页面
                        } else {
                            connection.query($sql.retrievePass.verificatTel, [data.account, data.tel], (err, result) => {
                                if (err) {
                                    errLog(err)
                                } else {
                                    if (result.length === 0) {
                                        result = {
                                            code: 97,
                                            msg: '手机号错误!'
                                        }
                                        jsonWrite(res, result)
                                    } else {
                                        connection.query($sql.retrievePass.changePass, [data.newPass, data.account, data.tel], (err, result) => {
                                            if (err) {
                                                errLog(err)
                                            } else {
                                                result = {
                                                    code: 99,
                                                    msg: '修改成功!'
                                                }
                                                jsonWrite(res, result)
                                            }
                                        })
                                    }
                                    console.log(result.length)
                                }
                            })
                        }
                    }
                    connection.release() // 释放连接
                })
            }
        })
    }
}