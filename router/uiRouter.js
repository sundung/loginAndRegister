

// 引入express

let express = require('express')

// 创建路由器

let router = new express.Router()

// 将ui路由写到这里

// 设置UI路由
// 登录UI路由
router.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html')
})
// 注册UI路由
router.get('/register', (req, res) => {
  res.sendFile(__dirname + '/public/register.html')
})

// 导出 ui路由

module.exports = router