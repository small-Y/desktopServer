/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../sqldb/pgConnect')


function getUserInfo(username,callback){
    if(username==undefined||username=='未定账户'){
        var loginUser={
            loginStatus:false,
            userID:'',
            username:'未定账户',
            age:''
        };
        return callback(loginUser);
    } else {
        let sql = `select *  from users WHERE "username" ='`+username+`'`
        client.query(sql , function(err, result) {
            if(err) {
                return console.log(err+'err')
            }else{
                // console.log(loginUser)
                return callback(result.rows[0]);
            }
        });
    }
}



exports.getUserInfo = getUserInfo;
