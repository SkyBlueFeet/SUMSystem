var user = {

  insert: 'INSERT INTO user_acc(id, nickname, account, password, regtime, tel, email, invcode) VALUES(0,?,?,?,?,?,?,?)',

  changePass: 'UPDATE user_acc SET password = ? WHERE tel = ?',

  delete: 'delete from user_acc where id=?',

  queryById: 'SELECT * FROM `user_acc` WHERE `id` = ?',
  // 查询所有用户
  queryAll: 'select * from user_acc',
  // 找回密码
  retrievePass: {
    verificatacc: 'select * from user_acc where account = ?', // 验证 账号
    verificatTel: 'select * from user_acc where account = ? AND tel= ?', // 验证手机号
    changePass: 'UPDATE user_acc SET password = ? WHERE  account= ? AND tel= ?'// 修改密码
  },
  // 登录
  login: {
    firstcheck: 'select * from user_acc where account = ?', // 查询 username
    secondcheck: 'select * from user_acc where account = ? and password=?' // 检查密码
  }

}

module.exports = user
