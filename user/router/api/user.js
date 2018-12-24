/**
 * 接口文件
 * router 是为了创建路由，因此需要引入 express并实例化一个 Router 组件，
 * router 组件是为接口创建的访问地址且访问时给浏览器返回接口数据
 * bcrypt 给密码进行加密以及对密码进行匹配
 * jsonwebtoken  返回 token
 * passport-jwt  验证 token，jwt 是一种验证规范
 * passport      专注用户验证
 * passport 验证token 方法：passport.authenticate('jwt',{ session: false })
 * 
 * verificationToken 验证 token 的方法
 * validatorRegister 提交信息验证方法
 */

 const express = require('express');
 const bcrypt = require('bcrypt');
 const jwt = require('jsonwebtoken');
 const router = express.Router();
 const UserModel = require("../../models/User");
 const Key = require('../../config/key');
 const passport = require("passport");   
 
 
 const verificationToken = passport.authenticate('jwt',{ session: false });
 const validatorRegister = require("../../validation/register");
 const validatorLogin = require("../../validation/login");

 /**
  * 指定接口地址
  * get 查询
  * post  提交
  * GET api/user/test
  */
 router.get('/test',(req,res) => {
     //返回一个 json 数据，可以知道这个接口是否请求成功
     UserModel.findOne({userEmail:req.body.userEmail}).then(user => res.json(user));
 });

 /**
  * POST api/user/register
  */
 router.post('/register',(req,res) => {
    //  console.log(req.body);
    //使用 es6 的解构赋值将 validatorRegister 返回的两个属性分别接收这个方法里的返回的值
    const {msg, isValid} = validatorRegister(req.body);
    //测试是否通过验证
    if(!isValid){
        return res.status(400).json(msg);
    }


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
 });

 /**
  * POST api/user/login
  * 返回 token
  * 了解 token 返回名称 Bearer，如果更换它的名称，则返回的 token 是无验证的，无法做其它请求:  
  * 
  * token:"Bearer " + token
  * 
  * Bearer Token (RFC 6750) 用于OAuth 2.0授权访问资源，
  * 任何Bearer持有者都可以无差别地用它来访问相关的资源，而无需证明持有加密key。
  */
 router.post('/login',(req,res) => {
    //验证
    const {msg, isValid} = validatorLogin(req.body);
    if(!isValid){
        return res.status(400).json(msg);
    }

    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    //查询当前数据库，email 是否存在
    UserModel.findOne({userEmail}).then(user => {
        if(!user){
            return res.status(404).json({userEmail:"用户不存在"});
        }

        /** 
         * 如果存在，就需要对密码进行匹配: bcrypt ,第一个参数是前端返回的 密码,第二个参数是数据库中的密码
         * 如果登录成功，就会返回一个 token
        */
        bcrypt.compare(userPassword, user.userPassword).then(isMatch => {
            if(isMatch){
                //登录成功，返回 token，token 的使用规则为：jwt.sign("规则","加密名称","过期时间","箭头函数")
                const rule = {
                    id: user._id,
                    name:user.userName
                };

                jwt.sign(rule,Key.secretName,{expiresIn:3600},(err,token) => {
                    if(err) throw err;
                    res.json({
                        sucess:true,
                        token:"Bearer " + token
                    });
                })
            }else{
                return res.status(400).json({userPassword:"密码错误"});
            }
        })
    })
});

 /**
  * GET api/user/getUser
  * 根据 token 请求用户信息
  * 验证 token :  router.get('/getUser',"验证token的方法",(req,res)
  */
 router.get('/getUser',verificationToken,(req,res) => {
     //如果 token 验证成功，返回对应的用户信息，但是不能返回密码等私密信息
    res.json({
        id:req.user.id,
        name:req.user.userName,
        email:req.user.userEmail
    })
 });

 //公开,方便 server.js 等其它地方调用
 module.exports = router;

 
