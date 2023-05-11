/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

// 1、导入fs模块，来操作文件
const fs = require('fs');
const axios =require("axios");

const  client = require('../sqldb/pgConnect')

function initWeather(){
    const nowTime = new Date();
    var now = nowTime.getTime();
    let sql = `select "updateTime" from dayweather order by "updateTime" desc limit 1`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // 
            // console.log(result.rows[0].updateTime)
            var updateTime = new Date(result.rows[0].updateTime).getTime();
            // console.log(showFormatTime())
            // console.log(now,updateTime)
            // console.log(now-updateTime,20*60*1000)
            if(now-updateTime>=15*60*1000){
                // console.log('时间间隔大于五分钟')
                initCityCode();
            }
            // return callback(loginUser);
        }
    });
    
}

function initCityCode(){
    // console.log('获取天气配置文件')
    // 获取城市
    // 获取城市
    // 1、调用fs.readFile()方法读取文件
    //    参数一：读取文件的存放路径
    //    参数二：读取文件时采用的编码格式，一般默认指定 utf8
    //    参数三：回调函数，拿到读取成功和失败的结果，err，dataStr
    fs.readFile('weather/weather.ini', 'utf8', (err, dataini) => {
        // 如果读取成功，则 err 的值为 null
        // 如果读取失败，则 err 的值为错误对象，dataStr的值为undefind

        if (err) {
            // 例如readFile路径错误就会进来
            console.log(`读取文件失败${err.message}`);
        }
        // console.log(`读取文件成功${dataini}`);
        var key='';
        var cityName='';
        var iniList = dataini.split('\r\n')
        for (let i = 0; i < iniList.length; i++) {
            const ele = iniList[i];
            if(ele.indexOf('key')!=-1){
                if(ele.split('=')[0]=='key'){
                    key=ele.split('=')[1];
                } 
            }else if(ele.indexOf('city')!=-1){
                if(ele.split('=')[0]=='city'){
                    cityName=ele.split('=')[1];
                }
            }
        }
        // console.log(key)
        // console.log(cityName)
        //
        // console.log('获取城市tag')
        fs.readFile('./public/CityList.csv', 'utf8', (err, dataStr) => {
            // 如果读取成功，则 err 的值为 null
            // 如果读取失败，则 err 的值为错误对象，dataStr的值为undefind
    
            if (err) {
                // 例如readFile路径错误就会进来
                console.log(`读取文件失败${err.message}`);
            }
            // console.log(`读取文件成功${dataStr}`);
            var cityTag='';
            var csvList = dataStr.split('\r\n')
            for (let i = 0; i < csvList.length; i++) {
                const ele = csvList[i];
                if(ele.indexOf(cityName)!=-1){
                    if(ele.split(',')[2]==cityName){
                        cityTag=ele.split(',')[0];
                    }
                }
            }
            // console.log(cityTag)
            getWeather(cityTag,key);
            getAir(cityTag,key);
        })
    })
    
}


function getWeather(cityTag,key){
    // 获取今天的天气
    var urlnow = 'https://devapi.qweather.com/v7/weather/now?location='+cityTag+'&key='+key
    axios.get(urlnow).then(res=>{
        addWeather(res.data);
    },err=>{
        console.log(err);
    })
}

function addWeather(data){
    // console.log('写入数据库');
    var now = data.now;
    // console.log(data)
    // console.log(now.cloud,now.dew,now.feelsLike,now.humidity,now.icon,now.obsTime,now.precip,now.pressure,now.temp);
    // console.log(now.text,now.vis,now.wind360,now.windDir,now.windScale,now.windSpeed,data.updateTime);
    let sql = `insert into dayweather values ('`+now.cloud+`','`+now.dew+`','`+now.feelsLike+`','`+now.humidity+`','`+now.icon+`','`+now.obsTime+`','`+now.precip+`','`+now.pressure+`','`+now.temp+`','`+now.text+`','`+now.vis+`','`+now.wind360+`','`+now.windDir+`','`+now.windScale+`','`+now.windSpeed+`','`+showFormatTime()+`')`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // 
            console.log('天气更新成功')
            // return callback(loginUser);
        }
    });
}

function getAir(cityTag,key){
    // 获取今天的天气
    var urlnow = 'https://devapi.qweather.com/v7/air/now?location='+cityTag+'&key='+key
    axios.get(urlnow).then(res=>{
        addAir(res.data);
    },err=>{
        console.log(err);
    })
}

function addAir(data){
    // console.log('写入数据库');
    var now = data.now;
    // console.log(now);
    let sql = `insert into dayair values ('`+now.aqi+`','`+now.category+`','`+now.co+`','`+now.level+`','`+now.no2+`','`+now.o3+`','`+now.pm2p5+`','`+now.pm10+`','`+now.primary+`','`+now.pubTime+`','`+now.so2+`','`+showFormatTime()+`')`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // 
            console.log('空气质量更新成功')
            // return callback(loginUser);
        }
    });
}


function showFormatTime(){
    const nowdate = new Date();
    var year = nowdate.getFullYear(),
        month = (nowdate.getMonth() + 1)<10?'0'+(nowdate.getMonth() + 1):(nowdate.getMonth() + 1),
        date = nowdate.getDate()<10?'0'+nowdate.getDate():nowdate.getDate(),
        h = nowdate.getHours()<10?'0'+nowdate.getHours():nowdate.getHours(),
        m = nowdate.getMinutes()<10?'0'+nowdate.getMinutes():nowdate.getMinutes(),
        s = nowdate.getSeconds()<10?'0'+nowdate.getSeconds():nowdate.getSeconds()
    return year + "-" + month + "-" + date + " " + h +":" + m + ":" + s;
}



exports.initWeather = initWeather;
