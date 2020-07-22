/*
  该模块主要负责创建用户模型
*/

// 引入mongoose
let mongoose = require('mongoose')

// 操作数据库

// 1. 请来一个保安  ---------引入约束Schema
let Schema = mongoose.Schema

// 2. 指定规则 -------- 创建一个约束对象实例
let userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  nick_name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: String,
    default: Date.now()
  },
  enable_flag: {
    type: String,
    default: 'Y'
  }
})

// 3. 告诉保安你的规则  ---- 创建模型对象

module.exports = mongoose.model('users', userSchema)