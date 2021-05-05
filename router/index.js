
var fs = require('fs');
//var healthModel = require('../models/healthSchema.js');

exports.fetchDorm = (req, res) => {
	console.log("操作数据库")
}

var express = require('express');
var app = express();
var router = require('./router/index.js');

//当前端GET方式访问http://localhost:3000//health/fetchdorm接口时，则采用router文件夹下面index.js文件中的fetchDorm逻辑

//app.get('/health/fetchdorm', router.fetchDorm);

//app.listen(3000, () => {
//    console.log('node服务器监听3000端口成功');
//})

