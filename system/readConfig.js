/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../sqldb/pgConnect')


function ReadConfig(userID,callback){
    let sql = `SELECT * from "myTheme" WHERE "userID" ='`+userID+`';SELECT * from "system";SELECT * from "installApp" WHERE "userID" = '`+userID+`';SELECT * from "userApp" WHERE "userID" = '`+userID+`';SELECT * from "installWidget" WHERE "userID" = '`+userID+`';SELECT "wrapperImg","type" from "wrapperImg" WHERE "userID" = '`+userID+`'`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // console.log(result)
            var config={};
            var sys={};
            sys.myTheme=result[0].rows[0].myTheme;
            sys.systemInfo=result[1].rows[0];
            config.system=sys;
            config.installApp=result[2].rows;
            config.userApp=result[3].rows;
            config.installWidget=result[4].rows;
            config.wrapperImg=result[5].rows[0].wrapperImg;
            config.wrapperImgType=result[5].rows[0].type;
            return callback(config);
        }
    });
}



exports.ReadConfig = ReadConfig;
