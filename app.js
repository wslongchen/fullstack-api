var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("cookie-session");

var urls = require('./routes/urls');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  keys: ["fullstack"]
}));
app.use(express.static(path.join(__dirname, 'public')));
///=======路由信息 （接口地址）开始 存放在./routes目录下===========//
urls.startUrls(app);
///=======路由信息 （接口地址 介绍===========//

///=======模板 开始===========//
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
///=======模板 结束===========//

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));


app.use(session({
  keys: ["fullstack"]
}));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
