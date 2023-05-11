/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../sqldb/pgConnect')

function setUserInfo(obj,callback){
    var username = obj.username;
    if(!username||username==undefined||username=='未定账户'){
        var result = {
            flag:false,
            info:'请先登录'
        }
        return callback(result);
    }
    
    var eMail = obj.eMail;
    var phoneNum = obj.phoneNum;
    var userCode = obj.userCode;
    var workCode = obj.workCode;
    var birthDay = obj.birthDay;
    var userAddress = obj.userAddress;
    let sql = `UPDATE "users" SET "eMail" = '`+eMail+`' ,"phoneNum" = '`+phoneNum+`' ,"userCode" = '`+userCode+`',"workCode" = '`+workCode+`',"birthDay" = '`+birthDay+`',"userAddress" = '`+userAddress+`' WHERE  "username" = '`+username+`'`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            var backData={
                flag:true,
                info:'修改成功'
            };
            return callback(backData);
            
        }
    });
}



exports.setUserInfo = setUserInfo;
