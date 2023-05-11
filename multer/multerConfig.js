/*
 * @Author: haoyuwei
 * @Date: 2023-4-8 17:53:14
 * @LastEditTime: 2023-4-8 17:53:14
 * @LastEditors: haoyuwei
 * @Description: multer配置文件
 * @FilePath: server\index.js
 */


var multer = require("multer");

const path = require('path') //
const resolve = (dir) => {
    return path.join(__dirname, './', dir)
}

// 设置图片存储路径
var storage = multer.diskStorage({
    // destination: './uploads/user',
    destination: function (req, file, cb) {
        cb(null,  resolve('../uploads/user')); // ../uploads是将存放图片文件夹创建在node项目平级，./uploads会存放在node项目根目录下，需要提前建好文件夹，否则会报错
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix+'.png')
    }
})
// 添加配置文件到muler对象。
var multerConfig = multer({ storage: storage });//.array("fileToUpload",1)
 

module.exports = multerConfig