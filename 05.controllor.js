// 引入模块
const express = require('express');
// 引入数据层
const model = require('./06.model');
const controllor = {
    // 请求主页的方法
    getIndexHtml(req,res){
        // 引入数据层获取所有英雄的方法
        model.getAllHero((arr)=>{
            // 引入模板引擎将数据传入渲染
            res.render('index',{arr});
        })
    },
    // 删除的方法
    deleteHeroID(req,res){
        // 根据id删除某个元素=>express里面处理了get请求的参数=>req.query可以获取id
        let id = req.query.id;
        // 读取json文件数据=>对比id=>跟点删除的id一致就执行删除
        model.getAllHero((arr)=>{
            // 遍历数组
            for(let i=0; i<arr.length; i++){
                if(arr[i].id == id){
                    // 把数据从数组里面移除=>arr.splice(从哪里开始删除，删除几个)
                    arr.splice(i,1);
                    break;//打断循环=>不能用return（终止函数的执行）
                }
            }
            // 把删除后的数据重新写入json
            model.writeFile(arr);
            // res.send 不仅仅可以返回字符串，还可以自动把对象转换为json字符串再返回
            res.send({code : 200,msg : '删除成功'});
        })
    },
    // 返回一个新增的页面
    getAdd(req,res){
        // 因为add.html里面没有动态数据，重新读取数据，麻烦=》直接使用render把页面返回
        // 先把add.html改为add.ejs
        res.render('add');
    },
    // 处理新增的逻辑
    addNewHero(req,res){
        // 需要先获取传递回来的数据=>注册express的中间件（body-parser） 对象 作用：解析
        // reqd对象身上多一个属性body=>一个对象，该对象是解析post请求传递回来的数据
        model.getAllHero((arr)=>{
            // 获取id
            model.getMaxId((maxId)=>{
                req.body.id = maxId+1;
                // 合并
                arr.push(req.body);
                console.log(arr);
                // 把数据写入json文件
                model.writeFile(arr);
                // 返回成功=>提示
                res.send({code:200,msg:'恭喜你，添加英雄成功'});
            })
        })
    },
    // 返回一个修改的页面
    getEdit(req,res){
        // 因为edit.html里面没有动态数据，重新读取数据，麻烦=》直接使用render把页面返回
        // 先把edit.html改为edit.ejs
        res.render('edit');
    },
    // 开一个根据id获取原来数据的接口的方法
    getHeroById(req,res){
        let id = req.query.id;
        console.log(id)
        model.getHeroById(id,target=>{
            let response = {};
            if(target){
                response.code = 200;
                response.msg = '获取成功';
                response.data = target;
            }else{
                response.code = 503;
                response.msg = '没有找到对应的数据，请确认id是否正确';
            }
            res.send(response);
        })
    },
    // 修改英雄信息
    editHeroById(req,res){
        // 获取数据
        let data = req.body;
        console.log(data);
        // 把数据读取出来
        model.getAllHero(arr=>{
            // 遍历数组，把id对比，如果id一致，就把数据修改
            arr.forEach(e => {
              if(e.id === data.id){
                  e.id = data;
                  break;
              }  
            });
            // 把修改是数据写入json文件数据库
            model.writeFile(arr);
            res.send({code:200,msg:'修改成功'});
        })
    }
}
// 暴露逻辑层
module.exports = controllor;