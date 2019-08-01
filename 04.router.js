// 引入模块
const express = require('express');
// 引入逻辑层
const controllor = require('./05.controllor');
// 创建一个路由对象
const router = express.Router();//express的路由是一个对象的方法
// 使用router对象，实现所有的监听请求
router.get('/index',(req,res)=>{
    // 调用请求index的方法
    controllor.getIndexHtml(req,res);
})
// 监听删除的请求
router.get('/deleteHeroID',(req,res)=>{
    // 调用controllor里面的删除操作方法
    controllor.deleteHeroID(req,res);
})
// 请求添加页面
router.get('/add',(req,res)=>{
    // 调用controllor里面的添加页面方法
    controllor.getAdd(req,res);
})
// 监听新增数据请求
router.post('/addNewHero',(req,res)=>{
    controllor.addNewHero(req,res);
})
// 请求监听以/edit 返回修改编辑页面
router.get('/edit',(req,res)=>{
    controllor.getEdit(req,res);
})
// 给前端一个根据id获取原来的数据的接口
router.get('/getHeroById',(req,res)=>{
    controllor.getHeroById(req,res);
})
// 修改英雄的端口
router.post('/editHeroById',(req,res)=>{
    controllor.editHeroById(req,res);
})
// 将路由层暴露
module.exports = router;