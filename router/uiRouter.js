/* 
  该模块是UI路由模块,用于管理UI路由

*/

// 引入express

let express = require('express')

// 引入 path模块 处理路径问题

let path = require('path')
// 创建路由器

let router = new express.Router()

// 引入用户模型
let userModel = require('../model/userModel')

// 引入 cookie-parser 模块
let cookieParser = require('cookie-parser')

// 注册cookieParser
router.use(cookieParser())


// 将ui路由写到这里

// 设置UI路由
// 登录UI路由
router.get('/login', (req, res) => {
  // res.sendFile(__dirname + '/public/login.html') 路径有问题
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
  res.render('register', { errMsg: {} })
})

// 个人中心----UI路由
router.get('/usercenter', async (req, res) => {
  /* // 获取cookie
  const { nick_name } = req.cookies
  // get 获取个人中心
  if (nick_name) {
    res.render('userCenter', { nickName: nick_name })
  } else {
    // cookie 过期 重新跳转
    res.redirect('/login')
  } */

  // 获取session
  const { _id } = req.session
  if (_id) {
    // 从数据库中查找id
    let result = await userModel.findOne({ _id })
    if (result) {
      res.render('userCenter', { nickName: result.nick_name })
    } else {
      console.log('用户非法修改cookie')
      res.redirect('/login')
    }
  } else {
    // cookie 过期 重新跳转
    res.redirect('/login')
  }

})
// 导出 ui路由

module.exports = router