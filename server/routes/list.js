var express = require('express')
var router = express.Router()
var list = require('../demo/demoList')
const bodyParser = require('body-parser')

// 查询所有用户
router.all('/', bodyParser.json(), (req, res, next) => {
    list.queryAll(req, res, next)
})
router.all('/limit', bodyParser.json(), (req, res, next) => {
    list.queryLimit(req, res, next)
})
router.all('/count', bodyParser.json(), (req, res, next) => {
    list.queryLength(req, res, next)
})
module.exports = router