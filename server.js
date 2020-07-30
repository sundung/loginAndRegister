

// 引入 express框架

let express = require('express')

// 引入数据连接模块
let db = require('./db')

// 引入 业务路由器
let businessRouter = require('./router/businessRouter')

// 引入ui路由器
let uiRouter = require('./router/uiRouter')

// 引入 express-session 用于在express中操作session
let session = require('express-session')

// 引入 connect-mongo 将session持久化到数据库
const MongoStore = require('connect-mongo')(session)

// 创建app服务器

let app = express()

// 配置模板引擎
app.set('view engine', 'ejs')

// 配置模板的存放目录
app.set('views', './view')

// 配置session和cookie的配置对象
app.use(session({
  name: 'userid', // 设置cookie的name,默认值是:connect.sid
  secret: 'zhoujielun', // 参与加密的字符串(又称签名)  ---> 必须要写的配置项
  saveUninitialized: false, // 是否在存储内容之前创建会话  -->,默认是true 开启
  resave: true, // 是否在每次请求时,强制重新保存session,即使没有变化
  store: new MongoStore({
    url: 'mongodb://localhost:27017/cookies_container',
    touchAfter: 24 * 3600 // 修改频率(例如:24小时之内只更新一次)
  }),
  cookie: {
    httpOnly: true, // 开启前端无法通过js操作cookie
    maxAge: 1000 * 30 // 设置cookie的过期时间
  }
}))

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