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
var convertSql = function(focus, addsql) {
    if (focus === 5) {
        sql = $sql.queryConditions[focus] + addsql
    } else {
        sql = $sql.queryConditions[focus] + ' AND ' + addsql
    }
    return sql
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
                        jsonWrite(res, result)
                        connection.release()
                    }
                })
            }
        })
    },
    searchOption: function(req, res, next) {
        // 搜索选项
        pool.getConnection(function(err, connection) {
            if (err) {
                errLog(err)
            } else {
                var data = req.body
                console.log(data)
                connection.query($sql.searchOption[data.option], ["%" + data.value + "%"], (err, result) => {
                    if (err) {
                        errLog(err)
                    } else {
                        jsonWrite(res, result)
                        connection.release()
                    }
                })
            }
        })
    },
    searchLoad: function(req, res, next) {
        // 搜索选项
        pool.getConnection(function(err, connection) {
            if (err) {
                errLog(err)
            } else {
                var data = req.body
                console.log(data)
                connection.query($sql.searchLoad[data.option], ["%" + data.value + "%"], (err, result) => {
                    if (err) {
                        errLog(err)
                    } else {
                        jsonWrite(res, result)
                        connection.release()
                    }
                })
            }
        })
    },
    queryOrder: function(req, res, next) {
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
                        jsonWrite(res, result)
                        connection.release()
                    }
                })
            }
        })
    },
    queryConditions: function(req, res, next) {
        // 搜索选项
        pool.getConnection(function(err, connection) {
            if (err) {
                errLog(err)
            } else {
                var data = req.body;
                console.log(data);
                if (data.focusCustom === false) {
                    if (data.gender === null && data.date === null && data.isc === null) {
                        $sql.queryConditions[5] = 'SELECT * FROM tableData'
                        connection.query($sql.queryConditions[data.focus], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender !== null && data.date === null && data.isc === null) {
                        sql = convertSql(data.focus, ' gender=?');
                        console.log(sql)
                        connection.query(sql, [data.gender], (err, result) => {
                            if (err) {
                                errLog(err, sql);
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender === null && data.date !== null && data.isc === null) {
                        sql = convertSql(data.focus, ' createdate>=? AND createdate<=?');
                        connection.query(sql, [data.date[0], data.date[1]], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender === null && data.date === null && data.isc !== null) {
                        sql = convertSql(data.focus, 'iscertification= ?');
                        connection.query(sql, [data.isc], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender !== null && data.date === null && data.isc !== null) {
                        sql = convertSql(data.focus, ' gender=? AND iscertification=?');
                        connection.query(sql, [data.gender, data.isc], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender !== null && data.date !== null && data.isc === null) {
                        sql = convertSql(data.focus, ' gender=? AND createdate>=? AND createdate<=?');
                        connection.query(sql, [data.gender, data.date[0], data.date[1]], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender === null && data.date !== null && data.isc !== null) {
                        sql = convertSql(data.focus, ' createdate>=? AND createdate<=? AND iscertification=?');
                        connection.query(sql, [data.date[0], data.date[1], data.isc], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender === null && data.date !== null && data.isc !== null) {
                        sql = convertSql(data.focus, ' createdate>=? AND createdate<=? AND iscertification=?');
                        connection.query(sql, [data.date[0], data.date[1], data.isc], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender !== null && data.date !== null && data.isc !== null) {
                        sql = convertSql(data.focus, ' createdate>=? AND createdate<=? AND iscertification=? AND gender=?');
                        connection.query(sql, [data.date[0], data.date[1], data.isc, data.gender], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else {
                        const msg = '没有该查询';
                        jsonWrite(res, msg)
                        connection.release()
                    }
                } else if (data.focusCustom) {
                    if (data.gender === null && data.date === null && data.isc === null) {
                        sql = 'SELECT * FROM tableData WHERE focus>=? AND focus<=?'
                        connection.query(sql, [data.focus[0], data.focus[1]], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender !== null && data.date === null && data.isc === null) {
                        sql = 'SELECT * FROM tableData WHERE focus>=? AND focus<=? AND gender=?'
                        connection.query(sql, [data.focus[0], data.focus[1], data.gender], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender === null && data.date !== null && data.isc === null) {
                        sql = 'SELECT * FROM tableData WHERE focus>=? AND focus<=? AND createdate>=? AND createdate<=?'
                        connection.query(sql, [data.focus[0], data.focus[1], data.date[0], data.date[1]], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender === null && data.date === null && data.isc !== null) {
                        sql = 'SELECT * FROM tableData WHERE focus>=? AND focus<=? AND iscertification=?'
                        connection.query(sql, [data.focus[0], data.focus[1], data.isc], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender !== null && data.date === null && data.isc !== null) {
                        sql = 'SELECT * FROM tableData WHERE focus>=? AND focus<=? AND gender=? AND iscertification=?'
                        connection.query(sql, [data.focus[0], data.focus[1], data.gender, data.isc], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender !== null && data.date !== null && data.isc === null) {
                        sql = 'SELECT * FROM tableData WHERE focus>=? AND focus<=? AND gender=? AND createdate>=? AND createdate<=?'
                        connection.query(sql, [data.focus[0], data.focus[1], data.gender, data.date[0], data.date[1]], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender === null && data.date !== null && data.isc !== null) {
                        sql = 'SELECT * FROM tableData WHERE focus>=? AND focus<=? AND createdate>=? AND createdate<=? AND iscertification=?'
                        connection.query(sql, [data.focus[0], data.focus[1], data.date[0], data.date[1], data.isc], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender === null && data.date !== null && data.isc !== null) {
                        sql = 'SELECT * FROM tableData WHERE focus>=? AND focus<=? AND createdate>=? AND createdate<=? AND iscertification=?'
                        connection.query(sql, [data.focus[0], data.focus[1], data.date[0], data.date[1], data.isc], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else if (data.gender !== null && data.date !== null && data.isc !== null) {
                        sql = 'SELECT * FROM tableData WHERE focus>=? AND focus<=? AND createdate>=? AND createdate<=? AND iscertification=? AND gender=?'
                        connection.query(sql, [data.focus[0], data.focus[1], data.date[0], data.date[1], data.isc, data.gender], (err, result) => {
                            if (err) {
                                errLog(err)
                            } else {
                                jsonWrite(res, result)
                                connection.release()
                            }
                        })
                    } else {
                        const msg = '没有该查询';
                        jsonWrite(res, msg)
                        connection.release()
                    }
                }
            }
        })
    }
}