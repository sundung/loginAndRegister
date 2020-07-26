/* 
该模块是业务路由,目前管理注册和登录业务

*/

// 引入express

let { Router } = require('express')

// 引入用户模型
let userModel = require('../model/userModel')

let router = new Router()

// 登录业务逻辑的路由
router.post('/login', async (req, res) => {
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
router.post('/register', async (req, res) => {
  // console.log(req.body)

  // 1.获取用户输入
  const { email, nick_name, password, re_password } = req.body
  // 2.校验数据的合法性
  // 1.定义验证规则正则
  const emailReg = /^[a-zA-Z0-9_]{4,16}@[a-zA-Z0-9]{2,16}\.com$/
  const nickNameReg = /[\u4e00-\u9fa5]/gm
  const passwordReg = /^[a-zA-Z0-9_#]{4,16}$/
  /* 
    ejs 模板改造的地方
  */

  // 定义一个收集错误信息的对象
  let errMsg = {}


  // 使用正则进行校验
  if (!emailReg.test(email)) {
    // res.send('邮箱输入不合法!要求邮箱用户名4-16位包含特殊字符_')
    // return
    errMsg.emailErr = '邮箱输入不合法!要求邮箱用户名4-16位包含特殊字符_'
  }
  if (!nickNameReg.test(nick_name)) {
    // res.send('昵称输入不合法,昵称为中文,')
    // return
    errMsg.nickNameErr = '昵称输入不合法,昵称为中文'
  }
  if (!passwordReg.test(password)) {
    // res.send('密码设置要求为4-16位字符')
    // return
    errMsg.passwordErr = '密码设置要求为4-16位字符'
  }
  if (password !== re_password) {
    // res.send('两次输入密码不一致')
    // return
    errMsg.rePasswordErr = '两次输入密码不一致'
  }

  // 判断errMsg 错误对象是否为空
  if (JSON.stringify(errMsg) !== '{}') {
    // 如果结果进来if判断,证明用户输入有错误
    res.render('register', { errMsg })
    // return 阻止后续代码执行,防止服务器报错
    return
  }

  // 为了防止数据库崩溃使用try catch 捕获错误
  try {
    // 3.检查邮箱是否注册过
    let findResult = await userModel.findOne({ email })
    if (findResult) {
      // res.send(`注册失败,${email}邮箱已经被注册了`)
      // return
      errMsg.emailErr = `注册失败,${email}邮箱已经被注册了`
      res.render('register', { errMsg })
    } else {
      // 真正的项目会引入1. 报警模块 2. 计数(错误)
      // 3.1 邮箱未被注册逻辑之后,将注册信息写入数据库
      await userModel.create({ email, nick_name, password })
      console.log(`邮箱为${email},昵称为${nick_name}的用户注册成功了`)
      // res.send('注册成功')
      // 目的是注册成功后将邮箱携带到登录页面上
      res.redirect(`/login?email=${email}`)
    }
  } catch (err) {
    console.log(err)
    // res.send('网络不稳定,稍后重试')
    errMsg.netWorkErr = '网络不稳定,稍后重试'
    res.render('register', { errMsg })
  }

})


// 暴露router  业务路由器(登录,注册)

module.exports = router