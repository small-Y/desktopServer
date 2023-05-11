/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../sqldb/pgConnect')


function SetTheme(obj,callback){
    var userID = obj.userID;
    var themeName = obj.themeName;
    let sql = `UPDATE "myTheme" SET "myTheme" = '`+themeName+`' WHERE "userID" ='`+userID+`';UPDATE "wrapperImg" SET "wrapperImg" = '/Theme/`+themeName+`/i/wrapper.jpg',"type"='t' WHERE "userID" ='`+userID+`'`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // console.log(result)
            var config={
                'flag':true,
                'info':'主题设置成功'
            }
            return callback(config);
        }
    });
}



exports.SetTheme = SetTheme;
