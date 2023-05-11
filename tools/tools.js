/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: tools工具库
 * @FilePath: server\index.js
 */


 function FormatDate(date) {
    //
    var year = date.getFullYear()
    var month = (date.getMonth() + 1)<10?'0'+(date.getMonth() + 1):(date.getMonth() + 1)
    var day = date.getDate()<10?'0'+date.getDate():date.getDate()
    var hours = date.getHours()<10?'0'+date.getHours():date.getHours()
    var minutes = date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes()
    var seconds = date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds()
    var time = year+'-'+month+'-'+day+' '+hours+':'+minutes+':'+seconds;
    return time
  }



exports.FormatDate = FormatDate;
