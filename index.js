/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: server启动文件
 * @FilePath: server\index.js
 */
 
const express = require('express');
var multer = require("multer");
const app = express()
const bodyParser = require('body-parser')
 
const cors = require('cors') //解决跨域问题
app.use(cors())

// 设置图片存储路径
var storage = multer.diskStorage({
    // destination: './uploads/user',
    destination: function (req, file, cb) {
        cb(null, './uploads'); // ../uploads是将存放图片文件夹创建在node项目平级，./uploads会存放在node项目根目录下，需要提前建好文件夹，否则会报错
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})
// 添加配置文件到muler对象。
var upload = multer({ storage: storage });//.array("fileToUpload",1)
 
const multiparty = require('connect-multiparty')
// 处理 x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
// 处理 mutipart/form-data
app.use(multiparty())
// 处理 application/json
app.use(bodyParser.json())

 //导入我们上一步写的连接数据库的函数
const {conPgsql} = require('./pgsql')
// 导入用户操作
const {Login} = require('./user/login')
const {getLogin} = require('./user/getLogin')
const {LoginOut} = require('./user/loginOut')
const {PostUserSign} = require('./user/PostUserSign')
const {UploadPic} = require('./user/uploadPic')
const {SetUserPass} = require('./user/setUserPass')

// 导入系统操作
const {ReadConfig} = require('./system/readConfig')
const {getThemeList} = require('./system/getThemeList')
const {SetTheme} = require('./system/SetTheme')
const {SetWrapper} = require('./system/SetWrapper')

//一个简单的测试接口   连接数据库表   test为表名
app.get('/test',(req,res)=>{
    res.send('测试用的接口')
})

//一个简单的接口，查询数据库中的信息
app.get('/getUser', (req, res) => {
	let sql = 'select * from users'
    console.log('开始查询')
    conPgsql(sql,function(result){
        res.send(JSON.stringify(result))
    })
   
})
app.post('/Login', (req, res) => {
    var username = req.body.name;
    var password = req.body.pass;
	
    console.log('登录更新')
    Login({username:username,password:password},function(result){
        res.send(JSON.stringify(result))
    })
   
})
app.post('/getLogin', (req, res) => {
    var username = req.body.username;
    console.log('登录查询')
    getLogin(username,function(result){
        res.send(JSON.stringify(result))
    })
   
})
app.post('/LoginOut', (req, res) => {
    var username = req.body.username;
    console.log(username+'注销登录')
    LoginOut(username,function(result){
        res.send(JSON.stringify(result))
    })
})
app.post('/setUserPass', (req, res) => {
    var username = req.body.username;
    var oldPass = req.body.oldPass;
    var password = req.body.pass;
	
    console.log('修改密码')
    SetUserPass({username:username,oldPass:oldPass,password:password},function(result){
        res.send(JSON.stringify(result))
    })
   
})
app.post('/readConfig', (req, res) => {
    var userID = req.body.userID;
    console.log(userID+'系统应用信息')
    ReadConfig(userID,function(result){
        res.send(JSON.stringify(result))
    })
})
app.post('/postUserSign', (req, res) => {
    var username = req.body.username;
    var userSign = req.body.userSign;
    console.log(username+'修改用户签名')
    PostUserSign({username:username,userSign:userSign},function(result){
        res.send(JSON.stringify(result))
    })
})
app.post('/getThemeList', (req, res) => {
    console.log('系统主题信息')
    getThemeList(function(result){
        res.send(JSON.stringify(result))
    })
})
app.post('/setTheme', (req, res) => {
    var userID = req.body.userID;
    var themeName = req.body.themeName;
    console.log('修改系统主题')
    SetTheme({userID:userID,themeName:themeName},function(result){
        res.send(JSON.stringify(result))
    })
})
app.post('/setWrapper', (req, res) => {
    var userID = req.body.userID;
    var fileName = req.body.fileName;
    var wrapperImgType = req.body.wrapperImgType;
    console.log('修改系统壁纸')
    SetWrapper({userID:userID,fileName:fileName,wrapperImgType:wrapperImgType},function(result){
        res.send(JSON.stringify(result))
    })
})
app.post('/uploadPic',upload.single('fileToUpload'),function (req, res) {
    console.log(req.file)
    console.log('上传头像')
    console.log(req.files.file)
    console.log('我是------------------')
    console.log(req.body)
    var userID = req.query.userID;
    var file = req.files.file
    UploadPic({userID:userID,file:file},function(result){
        res.send(JSON.stringify(result))
    })
    
})
 
//监听node服务器的端口号
app.listen(3000, () => {
	console.log('恭喜你，服务器启动成功')
})