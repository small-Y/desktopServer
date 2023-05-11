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

function weather3d(callback){
    initCityCode(callback);
}

function initCityCode(callback){
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
            getWeather(cityTag,key,callback);
        })
    })
    
}


function getWeather(cityTag,key,callback){
    // 获取今天的天气
    var urlnow = 'https://devapi.qweather.com/v7/weather/3d?location='+cityTag+'&key='+key
    axios.get(urlnow).then(res=>{
        return callback(res.data.daily);
    },err=>{
        console.log(err);
    })
}




exports.weather3d = weather3d;
