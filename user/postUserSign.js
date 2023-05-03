/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../pgConnect')

function PostUserSign(obj,callback){
    var username = obj.username;
    var userSign = obj.userSign;
    let sql = `select *  from users WHERE "username" ='`+username+`';UPDATE "users" SET "userSign" = '`+userSign+`' WHERE  "username" = '`+username+`'`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            if(result[0].rows.length>0&&result[1].rowCount==1){
                var loginUser={};
                for (let i = 0; i < result[0].rows.length; i++) {
                    const ele = result[0].rows[i];
                    loginUser.loginStatus=true;
                    loginUser.userID=ele.userID;
                    loginUser.username=ele.username;
                    loginUser.age=ele.age;
                    loginUser.fullname=ele.fullname;
                    loginUser.userInfo=ele.userInfo;
                    loginUser.lastLoginTime=ele.lastLoginTime;
                    loginUser.phoneNum=ele.phoneNum;
                    loginUser.email=ele.email;
                    loginUser.userType=ele.userType;
                    loginUser.userSign=userSign;
                }
                return callback(loginUser);
            }
            
        }
    });
}



exports.PostUserSign = PostUserSign;
