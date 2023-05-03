/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../pgConnect')


function getThemeList(callback){
    let sql = `SELECT * from "theme";SELECT * from "wrapper"`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // console.log(result)
            var config={};
            config.themeList=result[0].rows;
            config.wrapperList=result[1].rows;
            return callback(config);
        }
    });
}



exports.getThemeList = getThemeList;
