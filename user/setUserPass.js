/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../sqldb/pgConnect')

function SetUserPass(obj,callback){
    var username = obj.username;
    var oldPass = obj.oldPass;
    var password = obj.password;
    let sql = `UPDATE "users" SET "password" = '`+password+`',"loginStatus" = 'f' WHERE  "username" = '`+username+`' and "password" = '`+oldPass+`'`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // console.log(result)
            var config={
                'flag':false,
                'info':''
            };
            if(result.rowCount==1){
                config.flag=true
                config.info='密码修改成功'
            }else{
                config.info='密码修改失败'
            }
            return callback(config);
        }
    });
}



exports.SetUserPass = SetUserPass;
