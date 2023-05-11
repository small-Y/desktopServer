/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: 请求连接相关信息
 * @FilePath: server\index.js
 */


function getCookie(req) {
    return req.headers.cookie.split('TUser=')[1]
};


exports.getCookie = getCookie;
