/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../sqldb/pgConnect')

function setUserSign(obj,callback){
    var username = obj.username;
    if(!username||username==undefined){
        var result = {
            flag:false,
            info:'请先登录'
        }
        return callback(result);
    }
    var userSign = obj.userSign;
    if(!userSign){
        var result = {
            flag:false,
            info:'个性签名修改失败'
        }
        return callback(result);
    }
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
                    loginUser.clientIP=ele.clientIP;
                    loginUser.userCode=ele.userCode;
                    loginUser.workCode=ele.workCode;
                    loginUser.birthDay=ele.birthDay;
                    loginUser.userAddress=ele.userAddress;
                }
                return callback(loginUser);
            }
            
        }
    });
}



exports.setUserSign = setUserSign;
