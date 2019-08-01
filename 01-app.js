// 引入模块
const express = require('express');
// 创建服务器
const app = express();
// 绑定端口和IP地址 => app.listen(端口，IP，回调函数)
app.listen(8080,()=>{
    console.log('服务器已开启，可以通过 http://127.0.0.1:8080 访问');
});
// 处理静态资源
// 方式1 访问的时候不需要带文件夹名称
// app.use(express.static('views'));
// app.use(express.static('assets'));

// 方式2 => app.use(url前面所需的文件夹名称，指定的静态资源目录)
app.use('/views',express.static('views'));
app.use('/assets',express.static('assets'));

// // 设置pug为express的默认的模板引擎 - view ergine(固定单词) => app.set('view engine','pug')
// app.set('view engine','pug');
// // 监听
// app.get('/pug.html',(req,res)=>{
//     // 调用express渲染模板的方法 => 模板文件名，不用加路径，也不用加后缀 => res.render(模板文件名，导入的数据对象)
//     res.render('pug',{title:'hey',message:'你好啊'});
// })

// 设置ejs为express的默认的模板引擎 - view ergine(固定单词) => app.set('view engine','ejs')
app.set('view engine','ejs');
// 监听
app.get('/ejs.html',(req,res)=>{
    // 调用express渲染模板的方法 => 模板文件名，不用加路径，也不用加后缀 => res.render(模板文件名，导入的数据对象)
    res.render('ejs-templates',{id:1});
})

// 监听浏览器的请求 => app.get(访问的url,处理请求的对应的函数) => 相当于if(req.url === '/'){}
app.get('/',(req,res)=>{
    res.send('你好，有请求进入');
})