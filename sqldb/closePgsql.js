const  client = require('./pgConnect')

//关闭mysql数据库的函数
function closePgsql() {
	client.end((err) => {
		if (err) {
			console.log(`pgsql关闭失败:${err}!`)
		} else {
			console.log('pgsql关闭成功')
		}
	})
}

exports.closePgsql = closePgsql;