/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../pgConnect')


function getLogin(username,callback){
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
                var loginUser={};
                for (let i = 0; i < result.rows.length; i++) {
                    const ele = result.rows[i];
                    if(ele.loginStatus){
                        loginUser.loginStatus=ele.loginStatus;
                        loginUser.userID=ele.userID;
                        loginUser.username=ele.username;
                        loginUser.age=ele.age;
                        loginUser.fullname=ele.fullname;
                        loginUser.userInfo=ele.userInfo;
                        loginUser.lastLoginTime=ele.lastLoginTime;
                        loginUser.phoneNum=ele.phoneNum;
                        loginUser.email=ele.email;
                        loginUser.userType=ele.userType;
                        loginUser.userSign=ele.userSign;
                        loginUser.userPic=ele.userPic;
                    }
                }
                // console.log(loginUser)
                return callback(loginUser);
            }
        });
    }
}



exports.getLogin = getLogin;
