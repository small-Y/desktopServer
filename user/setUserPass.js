/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../pgConnect')

function SetUserPass(obj,callback){
    var username = obj.username;
    var oldPass = obj.oldPass;
    var password = obj.password;
    let sql = `UPDATE "users" SET "password" = '`+password+`' WHERE  "username" = '`+username+`' and "password" = '`+oldPass+`'`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            var config={
                'flag':true,
                'info':'密码修改成功'
            };
            return callback(config);
        }
    });
}



exports.SetUserPass = SetUserPass;
