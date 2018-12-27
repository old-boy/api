const express = require('express');
const router = express.Router();
const passport = require("passport");
const mongoose = require('mongoose');

const ProfilesSchema = require('../../models/Profiles');
const UserSchema = require('../../models/User');

const passportUser = passport.authenticate('jwt',{ session: false });

/** 
 * GET api/profile/test
 * 测试当前接口返回的 josn 数据
 * 公用
*/
router.get('/test',(req,res) => {
    res.json({msg:'this is profiles!!'})
});

/** 
 * GET api/profile
 * 获取当前登录用户的个人信息
*/
router.get('/profile',passportUser,(req,res) => {
    //这个接口需要用户登录之后才，根据用户的 token 来获取它的信息，因此，首先需要验证 passportUser
    //首先要从 ProfilesSchema 中查询这个用户信息是否存在,根据 这个数据模型中创建的 userId 来查询

    const errors = {};
    ProfilesSchema.findOne({userId:req.user.id}).then((profile) =>{
        if(!profile){
            errors.noProfile = '该用户不存在！';
            return res.status(404).json(errors);
        }

        //如果存在，则返回
        res.json(profile);
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router;