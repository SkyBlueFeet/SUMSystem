var list = {
    // 查询所有用户
    queryAll: "SELECT h_create_id,createdate,nickname,account, realname,gender, iscertification, compony,focus FROM hl_creater_msg",
    filtersData: {
        DESC: 'SELECT * FROM tableData ORDER BY ? DESC',
        FILTER: 'SELECT * FROM tableData WHERE ?=?',
    },
    searchOption: "SELECT `'h_create_id'` AS h_create_id,`'createdate'` AS createdate,`'nickname'` AS nickname,`'account'` AS account, `'realname'` realname,`'gender'` gender, `'iscertification'` iscertification, `'compony'` compony,`'focus'` focus FROM tableData where `?` LIKE ? ",
    searchLoad: "SELECT `?` AS value from tableData WHERE `?` LIKE ?"
}

module.exports = list