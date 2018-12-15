/**
 * 接口文件
 * router 是为了创建路由，因此需要引入 express并实例化一个 Router 组件，
 * router 组件是为接口创建的访问地址且访问时给浏览器返回接口数据
 */

 const express = require('express');
 const router = express.Router();

 /**
  * 指定接口地址
  * get 查询
  * post  提交
  * GET api/user/test
  */
 router.get('/test',(req,res) => {
     //返回一个 json 数据，可以知道这个接口是否请求成功
     res.json("msg:loging sucess");
 });

 /**
  * POST api/user/register
  */
 router.post('/register',(req,res) => {
     console.log(req.body);
 })

 //公开,方便 server.js 等其它地方调用
 module.exports = router;

 
