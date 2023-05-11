/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: server连接数据库
 * @FilePath: server\index.js
 */

//引入pg模块
// var pg = require("pg");
const {Client} = require('pg')
 
// 数据库配置
var config = {
    database:"postgres", //数据库名称
    user:"postgres",      //用户名
    password:"postgres",    //密码
    port:5432,            //端口号
    // 扩展属性
    max:20, // 连接池最大连接数
    idleTimeoutMillis:3000, // 连接最大空闲时间 3s
    multipleStatements:true  //   允许同时执行多条sql
};
// 创建连接池
// var client = new pg.Client(config);
var client = new Client(config);

client.connect(function(err) {
    if(err) {
        console.error('数据库连接出错', err);
    }else {
        console.log('数据库连接成功!');
    }
});

module.exports = client;
// exports.client = client;