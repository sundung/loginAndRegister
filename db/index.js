
// 引入 mongoose

const mongoose = require('mongoose')
mongoose.set('useCreateIndex', true)

// 定义数据库名
const DB_NAME = 'demo'

// 定义数据库地址
const DB_URL = 'localhost:27017'

// 构建一个promise实例,用于管理数据库连接

module.exports = new Promise((resolve, reject) => {
  // 2.连接数据库
  mongoose.connect(`mongodb://${DB_URL}/${DB_NAME}`, {
    useNewUrlParser: true
  })

  // 3. 监听连接状态
  mongoose.connection.on('open', (err) => {
    if (!err) {
      console.log(`位于${DB_URL}上的${DB_NAME}数据库连接成功`)
      resolve()
    } else {
      reject(err)
    }
  })
})
