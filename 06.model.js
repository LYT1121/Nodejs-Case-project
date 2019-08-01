// 引入模块
const express = require('express');
// 引入fs模块
const fs = require('fs');

let model = {
    // 获取所有英雄的方法
    getAllHero(callback){
        // 读取json文件
        fs.readFile('./data/heros.json','utf-8',(err,data)=>{
            if(err) console.log(err);
            // 将文件转换为数组的对象
            let arr = JSON.parse(data);
            callback(arr);
        })
    },
    // 把数组写入json文件的方法
    writeFile(arr){
        let content = JSON.stringify(arr);
        fs.writeFile('./data/heros.json',content,'utf-8',(err)=>{
            if(err) console.log(err);
        })
    },
    // 获取最大id
    getMaxId(callback){
        this.getAllHero((arr)=>{
            let id = arr[0].id;
            for(let i=0; i<arr.length; i++){
                if(arr[i].id>id){
                    id = arr[i].id;
                }
            }
            // 此时id就是最大的id=>也是通过回调函数得到最大id
            callback(id);
        })
    }
}
// 将数据层暴露
module.exports = model;