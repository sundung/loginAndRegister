

// 引入 express框架

let express = require('express')

// 引入数据连接模块
let db = require('./db')

// 引入 业务路由器
let businessRouter = require('./router/businessRouter')

// 引入ui路由器
let uiRouter = require('./router/uiRouter')

// 创建app服务器

let app = express()

// 配置模板引擎
app.set('view engine', 'ejs')

// 配置模板的存放目录
app.set('views', './view')

// 服务器启动成功调用数据库(数据库只启动一次,服务器启动失败,则启动数据库无意义)
// 数据库连接成功后,注册路由
db.then(() => {
  // 使用内置中间件处理post请求体参数
  app.use(express.urlencoded({ extended: true }))

  // 使用ui路由器中间件
  app.use(uiRouter)

  // 使用业务路由
  app.use(businessRouter)


}).catch((err) => {
  console.log('数据库连接失败', err)
})

// 处理业务逻辑路由


// 绑定监听 3000端口

app.listen(3000, (err) => {
  if (!err) {
    console.log('服务器启动成功')
  } else {
    console.log(err)
  }
})