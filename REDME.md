
## 练手的demo

## 项目使用 express + mongodb

## 模块化开发
  1. db 是连接数据库mongodb的代码
  2. model 是用户的数据模型,采用 npm下的mongoose包,简化操作mongodb数据库
  3. server.js 则是服务器和前端路由代码
  4. public 下的两个文件是登录和注册


## v2.0 登录注册路由器版,将路由器从server.js 拆分出去

## ejs模板引擎的使用
  1. 下载  
      npm i ejs
  2. 配置模板引擎
      app.set('view engine','ejs')
  3.配置模板的存放目录
      app.set('views','./view')
  4. 在view 目录下创建模板文件