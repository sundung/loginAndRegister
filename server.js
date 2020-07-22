

// 引入 express框架

let express = require('express')

// 引入数据连接模块
let db = require('./db')

// 引入用户模型
let userModel = require('./model/userModel')
// 创建app服务器

let app = express()

// 服务器启动成功调用数据库(数据库只启动一次,服务器启动失败,则启动数据库无意义)
// 数据库连接成功后,注册路由
db.then(() => {
  // 使用内置中间件处理post请求体参数
  app.use(express.urlencoded({ extended: true }))

  // 登录业务逻辑的路由
  app.post('/login', async (req, res) => {
    // 1. 获取用户输入
    const { email, password } = req.body
    // 2.验证用户输入的字段
    const emailReg = /^[a-zA-Z0-9_]{4,16}@[a-zA-Z0-9]{2,16}\.com$/
    const passwordReg = /^[a-zA-Z0-9_#]{4,16}$/
    // 使用正则进行校验
    if (!emailReg.test(email)) {
      res.send('邮箱输入不合法!要求邮箱用户名4-16位包含特殊字符_')
      // 不return 会导致代码继续向下执行,后台服务器会在控制台报错
      return
    }
    if (!passwordReg.test(password)) {
      res.send('密码设置要求为4-16位字符')
      return
    }
    try {
      let findResult = await userModel.findOne({ email, password })
      if (findResult) {
        res.redirect('https://www.baidu.com')
      } else {
        res.send('邮箱密码错误,请重试')
      }
    } catch (error) {
      console.log(error)
    }
  })

  // 注册业务逻辑的路由
  app.post('/register', async (req, res) => {
    // console.log(req.body)

    // 1.获取用户输入
    const { email, nick_name, password, re_password } = req.body
    // 2.校验数据的合法性
    // 1.定义验证规则正则
    const emailReg = /^[a-zA-Z0-9_]{4,16}@[a-zA-Z0-9]{2,16}\.com$/
    const nickNameReg = /[\u4e00-\u9fa5]/gm
    const passwordReg = /^[a-zA-Z0-9_#]{4,16}$/
    // 使用正则进行校验
    if (!emailReg.test(email)) {
      res.send('邮箱输入不合法!要求邮箱用户名4-16位包含特殊字符_')
      return
    }
    if (!nickNameReg.test(nick_name)) {
      res.send('昵称输入不合法,昵称为中文,')
      return
    }
    if (!passwordReg.test(password)) {
      res.send('密码设置要求为4-16位字符')
      return
    }
    if (password !== re_password) {
      res.send('两次输入密码不一致')
      return
    }

    // 为了防止数据库崩溃使用try catch 捕获错误
    try {
      // 3.检查邮箱是否注册过
      let findResult = await userModel.findOne({ email })
      if (findResult) {
        res.send(`注册失败,${email}邮箱已经被注册了`)
        return
      } else {
        // 真正的项目会引入1. 报警模块 2. 计数(错误)
        // 3.1 邮箱未被注册逻辑之后,将注册信息写入数据库
        await userModel.create({ email, nick_name, password })
        console.log(`邮箱为${email},昵称为${nick_name}的用户注册成功了`)
        res.send('注册成功')
      }
    } catch (err) {
      console.log(err)
      res.send('网络不稳定,稍后重试')
    }

  })

  // 设置UI路由
  // 登录UI路由
  app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html')
  })
  // 注册UI路由
  app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/public/register.html')
  })
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