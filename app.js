var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var router = require('./router/index.js');
var es = require('./models/es.js');

//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
//var bodyParser = require('body-parser');

//var users = require('./routes/users');
//var manages = require('./routes/manage');

var app = express();

app.set('src', path.join(__dirname, 'src'));
//app.set('view engine', 'ejs');

//当前端GET方式访问http://localhost:3000//health/fetchdorm接口时，则采用router文件夹下面index.js文件中的fetchDorm逻辑
app.use(express.static(path.join(__dirname, 'public')));
//app.get('/health/fetchdorm', router.fetchDorm);

app.use('/', router);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

app.listen(3000, () => {
    console.log('node服务器监听3000端口成功');
})

//module.exports = app;