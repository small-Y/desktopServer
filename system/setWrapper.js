/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('../pgConnect')


function SetWrapper(obj,callback){
    var userID = obj.userID;
    var fileName = obj.fileName;
    var type = obj.wrapperImgType;
    let sql = `;UPDATE "wrapperImg" SET "wrapperImg" = '/static/images/wrapper/`+fileName+`',"type"='`+type+`' WHERE "userID" ='`+userID+`'`
    client.query(sql , function(err, result) {
        if(err) {
            return console.log(err+'err')
        }else{
            // console.log(result)
            var config={
                'flag':true,
                'info':'壁纸设置成功'
            }
            return callback(config);
        }
    });
}



exports.SetWrapper = SetWrapper;
