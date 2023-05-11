/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../sqldb/pgConnect')

function Login(obj,callback){
    var username = obj.username;
    var password = obj.password;
    var clientIP = obj.clientIP;
    var lastLoginTime = obj.lastLoginTime;
    let sql = `select *  from users WHERE "username" ='`+username+`' and "password" ='`+password+`';UPDATE "users" SET "loginStatus" = 't' ,"lastLoginTime" = '`+lastLoginTime+`' ,"clientIP" = '`+clientIP+`' WHERE  "username" = '`+username+`' and "password" = '`+password+`'`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // console.log(result)
            var loginUser={
                'flag':false,
                'info':''
            };
            if(result[0].rows.length>0&&result[1].rowCount==1){
                loginUser.flag=true;
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
                    loginUser.eMail=ele.eMail;
                    loginUser.userType=ele.userType;
                    loginUser.userSign=ele.userSign;
                    loginUser.userPic=ele.userPic;
                }
                return callback(loginUser);
            }else{
                loginUser.info='登录账户不存在或者密码错误！'
                return callback(loginUser);
            }
            
        }
    });
}



exports.Login = Login;
