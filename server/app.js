var createError = require('http-errors')
var express = require('express')
var ejs = require('ejs')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')
var userRouter = require('./routes/user')
var listRouter = require('./routes/list')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
    // 允许所有的请求方式
app.use(function(req, res, next) {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        next()
    })
    // view engine setup
app.set('views', path.join(__dirname, 'views'))
// app.engine('.html', ejs.__express)
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/list', listRouter)
    // catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use((err, req, res, nex) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

module.exports = app