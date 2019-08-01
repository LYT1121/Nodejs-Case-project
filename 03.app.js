// 引入模块
const express = require('express');
// 引入路由层
const router = require('./04.router');
// 引入body-parser
const bodyParser = require('body-parser');
// 创建服务器
const app = express();
// 绑定端口和IP地址
app.listen(8080,()=>{
    console.log('服务器已开启，可以通过 http://127.0.0.1:8080 访问');
})
// 获取静态资源
app.use('/views',express.static('views'));
app.use('/assets',express.static('assets'));

// 允许跨域
let allow = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  }
app.use(allow)
  
// 设置默认模板引擎
app.set('view engine','ejs');

// 注册body-parser中间件=>作用：解析post请求的数据
app.use(bodyParser.urlencoded({extended:false}));

// 注册路由中间件
app.use(router);