/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */


const  client = require('../sqldb/pgConnect')

function weatherList(obj,callback){
    var pageNum = obj.pageNum;
    var curPage = obj.curPage;
    var startTime = obj.startTime
    var endTime = obj.endTime
    if(pageNum==undefined&&curPage==undefined){
        var sql = `select * from dayweather WHERE "updateTime" >= '`+startTime+`' and "updateTime" <= '`+endTime+`' order by "updateTime" desc  `
    }else{
        var sql = `select *,count(*) over () as total from dayweather WHERE "updateTime" >= '`+startTime+`' and "updateTime" <= '`+endTime+`' order by "updateTime" desc limit `+pageNum+` offset `+pageNum*(curPage-1)
    }
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // 
            return callback(result.rows);
        }
    });
}

exports.weatherList = weatherList;
