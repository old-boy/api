/**
 * 接口文件
 * router 是为了创建路由，因此需要引入 express并实例化一个 Router 组件，
 * router 组件是为接口创建的访问地址且访问时给浏览器返回接口数据
 */

 const express = require('express');
 const bcrypt = require('bcrypt');
 const router = express.Router();
 const UserModel = require("../../models/User");

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

     //查询数据库中是否有提交的字段
     UserModel.findOne({userEmail:req.body.userEmail}).then((user) => {
         if(user){
             return res.status(400).json({userEmail:"邮箱巳被注册"});
         }else{
             const newUser = new UserModel({
                 userName: req.body.userName,
                 userEmail: req.body.userEmail,
                 userPassword: req.body.userPassword
             })

            //给 newUser.userPassword 加密,hash 为加密后的密码
             bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.userPassword, salt, (err, hash) => {
                    if(err) throw err;
                    
                    newUser.userPassword = hash;

                    //保存到数据库
                    newUser.save().then(user => res.json(user))
                                  .catch(err => console.log(err));
                });
            });
         }
     })
 })

 //公开,方便 server.js 等其它地方调用
 module.exports = router;

 
