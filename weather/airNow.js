/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../sqldb/pgConnect')

function airNow(callback){
    let sql = `select * from dayair order by "updateTime" desc`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // 
            return callback(result.rows[0]);
        }
    });
}

exports.airNow = airNow;
