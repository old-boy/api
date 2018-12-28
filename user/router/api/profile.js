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
});

/** 
 * POST api/profile
 * 创建和编辑个人信息
*/
router.post('/profile',passportUser,(req,res) =>{
    const profileEntity = {};
    const errors = {};
    profileEntity.user = req.user.id;

    if(req.body.hanle){
        profileEntity.hanle = req.body.hanle;
    }
    if(req.body.company){
        profileEntity.company = req.body.company;
    }
    if(req.body.website){
        profileEntity.website = req.body.website;
    }
    if(req.body.location){
        profileEntity.location = req.body.location;
    }
    if(req.body.status){
        profileEntity.status = req.body.status;
    }

    if(req.body.bio){
        profileEntity.bio = req.body.bio;
    }
    if(req.body.githubUserName){
        profileEntity.githubUserName = req.body.githubUserName;
    }

    //数组转换,根据逗号转换成数组字符串
    if(typeof req.body.skills != 'undefined'){
        profileEntity.skills = req.body.skills.split(',')
    }

    profileEntity.social = {};

    if(req.body.wechat){
        profileEntity.social.wechat = req.body.wechat;
    }
    if(req.body.qq){
        profileEntity.social.qq = req.body.qq;
    }
    if(req.body.tengxunkt){
        profileEntity.social.tengxunkt = req.body.tengxunkt;
    }
    if(req.body.wangyikt){
        profileEntity.social.wangyikt = req.body.wangyikt;
    }

    //查找数据库
    ProfilesSchema.findOne({user:req.user.id}).then(profile => {
        if(profile){
            //用户存在，执行更新方法
            ProfilesSchema.findByIdAndUpdate({user:req.user.id},{$set:profileEntity},{new:true}).then(profile => {
                res.json(profile)
            });
        }else{
            //用户不存在，执行创建方法
            //判断用户是否存在的标志是否存在
            ProfilesSchema.findOne({hanle:profileEntity.hanle}).then(profile => {
                if(profile){
                    errors.hanle = '该用户的个人信息已经存在，请不要再创';
                    res.status(400).json(errors);
                }

                new Profile(profileEntity).save().then(profile => {
                    res.json(profile);
                })
            })
        }
    })
});


module.exports = router;