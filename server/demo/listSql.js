var list = {
    // 查询所有用户
    queryAll: "SELECT h_create_id,createdate,nickname,account, realname,gender, iscertification, compony,focus FROM hl_creater_msg",
    filtersData: {
        DESC: 'SELECT * FROM tableData ORDER BY ? DESC',
        FILTER: 'SELECT * FROM tableData WHERE ?=?',
    },
    searchOption: [
        'SELECT * FROM tableData WHERE h_create_id LIKE ?',
        'SELECT * FROM tableData WHERE createdate LIKE ?',
        'SELECT * FROM tableData WHERE nickname LIKE ?',
        'SELECT * FROM tableData WHERE realname LIKE ?',
        'SELECT * FROM tableData WHERE account LIKE ?',
        'SELECT * FROM tableData WHERE compony LIKE ?',
    ],
    searchLoad: [
        "SELECT h_create_id AS value from tableData WHERE h_create_id LIKE ?",
        "SELECT createdate AS value from tableData WHERE createdate LIKE ?",
        "SELECT nickname AS value from tableData WHERE nickname LIKE ?",
        "SELECT realname AS value from tableData WHERE realname LIKE ?",
        "SELECT account AS value from tableData WHERE account LIKE ?",
        "SELECT compony AS value from tableData WHERE compony LIKE ?",
    ],
    queryConditions: [
        //其他三项全为null时
        "SELECT * FROM tableData WHERE focus<=1000",
        "SELECT * FROM tableData WHERE focus>1000 AND focus<=10000",
        "SELECT * FROM tableData WHERE focus>10000 AND focus<=100000",
        "SELECT * FROM tableData WHERE focus>100000 AND focus<=500000",
        "SELECT * FROM tableData WHERE focus>500000",
        "SELECT * FROM tableData WHERE ",
        "SELECT * FROM tableData WHERE focus>=? AND focus<=?"
    ]
}

module.exports = list