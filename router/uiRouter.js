/* 
  该模块是UI路由模块,用于管理UI路由

*/

// 引入express

let express = require('express')

// 引入 path模块 处理路径问题

let path = require('path')

// 创建路由器

let router = new express.Router()

// 将ui路由写到这里

// 设置UI路由
// 登录UI路由
router.get('/login', (req, res) => {
  // res.sendFile(__dirname + '/public/login.html')
  // res.sendFile(path.resolve(__dirname, '../public/login.html'))
  // 使用ejs模板
  // 获取 传过来的邮箱账号
  const { email } = req.query
  // 在错误对象中携带email
  res.render('login', { errMsg: { email } })
})
// 注册UI路由
router.get('/register', (req, res) => {
  // res.sendFile(__dirname + '/public/register.html')
  // res.sendFile(path.resolve(__dirname, '../public/register.html'))
  // 使用ejs模板
  // { errMsg } 将注册页面的错误信息对象携带给注册页面
  res.render('register', { errMsg })
})

// 导出 ui路由

module.exports = router