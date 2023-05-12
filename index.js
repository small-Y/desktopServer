/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: server启动文件
 * @FilePath: server\index.js
 */
 
const express = require('express');
const bodyParser = require('body-parser')
var router = require("./router/router");
const cors = require('cors') //解决跨域问题

const app = express()
app.use(cors())



// 公开静态文件夹，匹配`虚拟路径img` 到 `真实路径public` 注意这里  /img/ 前后必须都要有斜杠！！！
app.use('/img/', express.static('./uploads/'))

// 处理 x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// 处理 application/json
app.use(bodyParser.json())

// 挂载路由
app.use(router)

 
 
//监听node服务器的端口号
app.listen(3000, () => {
	console.log('恭喜你，服务器启动成功')
})