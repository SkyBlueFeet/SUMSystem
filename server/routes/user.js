var express = require('express')
var router = express.Router()
var user = require('../demo/demoUser')
const bodyParser = require('body-parser')

// 查询所有用户
router.get('/', bodyParser.json(), (req, res, next) => {
  user.queryAll(req, res, next)
})
// 登录
router.post('/login', bodyParser.json(), (req, res, next) => {
  user.userLogin(req, res, next)
})
// 注册验证
router.post('/register', bodyParser.json(), (req, res, next) => {
  user.userReg(req, res, next)
})
// 找回密码
router.post('/retrievePass', bodyParser.json(), (req, res, next) => {
  user.retrievePass(req, res, next)
})
module.exports = router
