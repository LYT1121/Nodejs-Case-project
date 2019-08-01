// 引入模块
const express = require('express');
// 引入fs模块
const fs = require('fs');
// 创建服务器
const app = express();
// 绑定端口和IP地址 => app.listen(端口，IP，回调函数)
app.listen(8080, () => {
    console.log('服务器已开启，可以通过 http://127.0.0.1:8080 访问');
});

// app.use(url前面所需的文件夹名称，指定的静态资源目录)
app.use('/views', express.static('views'));
app.use('/assets', express.static('assets'));


// 设置ejs为express的默认的模板引擎 - view ergine(固定单词) => app.set('view engine','ejs')
app.set('view engine', 'ejs');
// 监听
app.get('/index.html', (req, res) => {
    // 读取数据
    fs.readFile('./data/heros.json', 'utf-8', (err, data) => {
        if (err) console.log(err);
        let arr = JSON.parse(data);
        // 调用express渲染模板的方法 => 模板文件名，不用加路径，也不用加后缀 => res.render(模板文件名，导入的数据对象)
        res.render('index', { arr });
    })
})
