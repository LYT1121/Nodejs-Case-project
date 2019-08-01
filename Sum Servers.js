// 引入http模块
const http = require('http');
// 引入fs模块
const fs = require('fs');
// 引入art-template模板引擎模块
const template = require('art-template');
// 引入queryString核心模块
const queryString = require('querystring');
// 创建一个服务器=>参数默认就好
const server = http.createServer();
// 获取端口和IP
server.listen(8080,()=>{
    console.log('服务器已启动，可通过 http://127.0.0.1:8080 访问');
})
// 注册事件
server.on('request',(req,res)=>{
    // 获取所有的静态资源 => 通过文件夹名字 => 以其开头
    if(req.url.startsWith('/assets')){
        // 要单独处理css的响应头
        if(req.url.endsWith('.css')){
            res.setHeader('Content-Type','text/css');
        };
        // 使用fs模块读取数据并返回
        fs.readFile(__dirname + req.url,(err,data)=>{
            if(err) console.log(err);// throw 在特别严谨的情况下才使用
            res.end(data);
        })
    }else 
    // 处理动态页面的逻辑=>约定好 req.url === '/views/index.html' => 返回一个art-template 生成的主页给浏览器
    if(req.url === '/views/index.html'){
        // 把json文件里面是数据读取出来
        fs.readFile(__dirname+'/data/heros.json','utf-8',(err,data)=>{
            // 把获取到的json格式字符串转换为数组
            let arr = JSON.parse(data);
            // 把数组放到模板里面替换=>写模板代码（views里面有一个index.html模板）=>导入数据
            let html = template(__dirname+'/views/index.html',{arr});
            res.end(html);
        })
    }else
    // 处理add.html的静态页面请求
    if(req.url === '/views/add.html'){
        // 把json文件里面是数据读取出来
        fs.readFile(__dirname+'/views/add.html',(err,data)=>{
            if(err) console.log(err);
            res.end(data);
        })
    }else
    // 处理新增的请求
    // post 请求=>先给req对象注册一个正在接收数据事件(post是在请求体里面的数据，数量可能很多，一块一块传输)
    if(req.url === '/addNewHero' && req.method === 'POST'){
        // 先定义一个空字符串
        let data = '';
        // 注册正在接收数据对象 // chunck - 块
        req.on('data',function(chunck){
            // 把接收到的数据合并
            data += chunck;
        })
        // 在接收完毕事件里面处理数据
        req.on('end',()=>{
            // console.log(data);
            // 得到的数据是一个url编码的格式=>解析成对象
            data = queryString.parse(data);
            // 把json文件里面是数据读取出来
            fs.readFile(__dirname+'/data/heros.json','utf-8',(err,datas)=>{
                if(err) console.log(err);
                // 把获取到的json格式字符串转换为数组
                let arr = JSON.parse(datas);
                // 添加id
                let id = arr[0].id;
                // 遍历数组
                for(let i=1; i<arr.length; i++){
                    if(arr[i].id>id){
                        id = arr[i].id;
                    }
                }
                data.id = id+1;
                // 数据合并
                arr.push(data);
                // fs模块提供一个写入文件的方法=>fs.writeFile(文件路径,写入的内容,编码格式,写入完成的回调函数)
                let jsonStr = JSON.stringify(arr);
                // 写入数据
                fs.writeFile('./data/heros.json',jsonStr,'utf-8',(err)=>{
                    if(err){
                        console.log(err);
                    }else{
                        let result = JSON.stringify({code:200,msg:'恭喜你，新增成功'});
                        res.end(result);
                    }
                })
            })
        })
    }
})