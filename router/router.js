/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: router 路由文件
 * @FilePath: server\index.js
 */

const express = require('express')
const router = express.Router()


//导入我们上一步写的连接数据库的函数
const {conPgsql} = require('../sqldb/pgsql')
// 导入用户操作
const {Login} = require('../user/login')
const {getLogin} = require('../user/getLogin')
const {LoginOut} = require('../user/loginOut')
const {setUserSign} = require('../user/setUserSign')
const {UploadPic} = require('../user/uploadPic')
const {SetUserPass} = require('../user/setUserPass')
const {getUserInfo} = require('../user/getUserInfo')
const {setUserInfo} = require('../user/setUserInfo')

// tools方法
const {FormatDate} = require('../tools/tools')

// 连接信息
const {getClientIp} = require('../client/getClientIp')
const {getCookie} = require('../client/getCookie')

// 导入系统操作
const {ReadConfig} = require('../system/readConfig')
const {getThemeList} = require('../system/getThemeList')
const {SetTheme} = require('../system/SetTheme')
const {SetWrapper} = require('../system/SetWrapper')

// multer 方法
const upload = require('../multer/upload.js');

// 添加天气数据
const {initWeather} = require('../weather/initWeather')
setInterval(() => {
    // console.log('后台天气数据更新')
    initWeather();
}, 5*60*1000);    //5*60*1000
const {weatherNow} = require('../weather/weatherNow')
const {airNow} = require('../weather/airNow')
const {weather3d} = require('../weather/weather3d')
const {weather24h} = require('../weather/weather24h')
const {weatherList} = require('../weather/weatherList')
const {airList} = require('../weather/airList')


//一个简单的测试接口   连接数据库表   test为表名
router.get('/test',(req,res)=>{
    res.send('测试用的接口')
})

//一个简单的接口，查询数据库中的信息
router.get('/getUser', (req, res) => {
	let sql = 'select * from users'
    console.log('开始查询')
    conPgsql(sql,function(result){
        res.send(JSON.stringify(result))
    })
   
})
router.post('/Login', (req, res) => {
    var username = req.body.name;
    var password = req.body.pass;
	var clientIP = getClientIp(req)
    var now = new Date();
    var lastLoginTime = FormatDate(now);
    console.log('登录更新')
    Login({username:username,password:password,clientIP:clientIP,lastLoginTime:lastLoginTime},function(result){
        res.send(JSON.stringify(result))
    })
   
})
router.post('/getLogin', (req, res) => {
    var username = getCookie(req);
    // console.log(username)
    console.log('登录查询')
    getLogin(username,function(result){
        res.send(JSON.stringify(result))
    })
   
})
router.post('/LoginOut', (req, res) => {
    var username = req.body.username;
    console.log(username+'注销登录')
    LoginOut(username,function(result){
        res.send(JSON.stringify(result))
    })
})
router.post('/setUserPass', (req, res) => {
    var username = req.body.username;
    var oldPass = req.body.oldPass;
    var password = req.body.pass;
	
    console.log('修改密码')
    SetUserPass({username:username,oldPass:oldPass,password:password},function(result){
        res.send(JSON.stringify(result))
    })
   
})
router.post('/readConfig', (req, res) => {
    var userID = req.body.userID;
    console.log(userID+'系统应用信息')
    ReadConfig(userID,function(result){
        res.send(JSON.stringify(result))
    })
})
router.post('/setUserSign', (req, res) => {
    var username = getCookie(req);
    var userSign = req.body.userSign;
    console.log(username+'修改用户签名')
    setUserSign({username:username,userSign:userSign},function(result){
        res.send(JSON.stringify(result))
    })
})
router.post('/getThemeList', (req, res) => {
    console.log('系统主题信息')
    getThemeList(function(result){
        res.send(JSON.stringify(result))
    })
})
router.post('/setTheme', (req, res) => {
    var userID = req.body.userID;
    var themeName = req.body.themeName;
    console.log('修改系统主题')
    SetTheme({userID:userID,themeName:themeName},function(result){
        res.send(JSON.stringify(result))
    })
})
router.post('/setWrapper', (req, res) => {
    var userID = req.body.userID;
    var fileName = req.body.fileName;
    var wrapperImgType = req.body.wrapperImgType;
    console.log('修改系统壁纸')
    SetWrapper({userID:userID,fileName:fileName,wrapperImgType:wrapperImgType},function(result){
        res.send(JSON.stringify(result))
    })
})
router.post('/uploadPic',function (req, res) {
    upload(req, res).then(imgsrc => {
        console.log('我是------------------')
        console.log(imgsrc)
        var username = getCookie(req);
        UploadPic({imgsrc:imgsrc,username:username},function(result){
            res.send(JSON.stringify(result))
        })
    }).catch(err => {
        console.log(err)
    })
    
    
})
router.post('/weather/now', (req, res) => {
    console.log('天气-今日')
    weatherNow(function(result){
        res.send(JSON.stringify(result))
    })
})
router.post('/weather/air', (req, res) => {
    console.log('空气质量-今日')
    airNow(function(result){
        res.send(JSON.stringify(result))
    })
})
router.post('/weather/3d', (req, res) => {
    console.log('天气-三天')
    weather3d(function(result){
        res.send(JSON.stringify(result))
    })
})
router.post('/weather/24h', (req, res) => {
    console.log('天气-24小时')
    weather24h(function(result){
        res.send(JSON.stringify(result))
    })
})
router.post('/weather/weatherList', (req, res) => {
    console.log('天气-历史')
    var curPage = req.body.curPage;
    var pageNum = req.body.pageNum;
    var startTime = req.body.startTime
    var endTime = req.body.endTime
    weatherList({
        curPage:curPage,
        pageNum:pageNum,
        startTime:startTime,
        endTime:endTime
    },function(result){
        res.send(JSON.stringify(result))
    })
})
router.post('/weather/airList', (req, res) => {
    console.log('空气质量-历史')
    var curPage = req.body.curPage;
    var pageNum = req.body.pageNum;
    var startTime = req.body.startTime
    var endTime = req.body.endTime
    airList({
        curPage:curPage,
        pageNum:pageNum,
        startTime:startTime,
        endTime:endTime
    },function(result){
        res.send(JSON.stringify(result))
    })
})

router.post('/getUserInfo', (req, res) => {
    var username = getCookie(req);
    console.log('查询用户信息')
    getUserInfo(username,function(result){
        res.send(JSON.stringify(result))
    })
   
})
router.post('/setUserInfo', (req, res) => {
    var username = getCookie(req);
    var obj = req.body.formLabelAlign;
    obj.username = username;
    console.log('修改用户信息')
    setUserInfo(obj,function(result){
        res.send(JSON.stringify(result))
    })
   
})










module.exports = router