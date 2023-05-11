/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../sqldb/pgConnect')


function UploadPic(obj,callback){
    var username = obj.username;
    var imgsrc = obj.imgsrc;
    console.log(username)
    let sql = `UPDATE "users" SET "userPic" = '`+imgsrc+`' WHERE  "username" = '`+username+`'`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // console.log(result)
            var config={
                'flag':true,
                'info':'上传成功'
            };
            return callback(config);
        }
    });
}



exports.UploadPic = UploadPic;
