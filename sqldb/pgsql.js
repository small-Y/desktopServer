/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: serve操作数据库
 * @FilePath: server\index.js
 */

const  client = require('./pgConnect')


function conPgsql(sql,callback){
    // 查询
    // 利用查询字符串query进行查询
    // "SELECT * from users";
    client.query(sql , function(err, result) {
        if(err) {
            console.log(err+'err')
            return callback(err);
        }else{
            // let res = JSON.parse(JSON.stringify(result))
            // console.log(res.rows+'rows');
            // console.log(res.rowCount+'count');
            // closePgsql(client);
            var res = {
                status: true,
                code:200,
                message: "数据查询成功！",
                data: result.rows,
                dataCount: result.rowCount
            }
            return callback(res);
            // client.end();// 释放连接（将其返回给连接池）
        }
        
    });


    // client
    //     .query(sql)
    //     .then(result => {
    //         console.log(result)
    //     })
    //     .catch(err => {
    //         console.log(err);
    //     })
    
}



exports.conPgsql = conPgsql;
// module.exports = conPgsql;
