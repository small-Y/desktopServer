/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../sqldb/pgConnect')


function LoginOut(username,callback){
    let sql = `UPDATE "users" SET "loginStatus" = 'f' WHERE "username" = '`+username+`'`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            console.log(result.rows)
            let sql = `select *  from users WHERE "username" ='`+username+`'`
            client.query(sql , function(err, result) {
                if(err) {
                    return console.log(err+'err')
                }else{
                    var loginUser={};
                    for (let i = 0; i < result.rows.length; i++) {
                        const ele = result.rows[i];
                        if(ele.loginStatus){
                            loginUser.loginStatus=ele.loginStatus;
                            loginUser.userID=ele.userID;
                            loginUser.username=ele.username;
                            loginUser.age=ele.age;
                        }
                    }
                    console.log(loginUser)
                    return callback(loginUser);
                }
            });
        }
    });
}



exports.LoginOut = LoginOut;
