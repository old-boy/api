const express = require('express');
const router = express.Router();
const passport = require("passport");

const passportInfo = passport.authenticate('jwt',{ session: false });

const HomeSchema = require('../../../models/AnvizHome');

const homeBannerValidator = require('../../../validation/anviz/homeBanner');
const homeProdcutValidator = require('../../../validation/anviz/homeProdcutList');
const homeCaseValidator = require('../../../validation/anviz/homeCaseValidator');

/** 
 * GET api/anviz/home/test
 * 测试当前接口返回的 josn 数据
 * 公用
*/
router.get('/test',(req,res) => {
    res.json({msg:'this is anviz!!'})
});

/** 
 * GET api/anviz/home/banner
 * 查询 banner 数据
 * 公用
*/
router.get('/banner',(req,res) => {
    let msg = {};
    HomeSchema.find()
              .populate('banners',["bannerBg","bannerName","bannerSubName"])
              .then(banners => {
                if(!banners){
                    return res.status(404).json({msg:'banner 不存在！！'})
                }
                
                res.json(banners)
    }).catch(err => res.status(404).json(err));
});

/** 
 * POST api/anviz/home/banner
 * 添加 banner 数据
 * 根据 token 
*/
router.post("/banner",passportInfo,(req,res) => {

    const {msg,isValid} = homeBannerValidator(req.body);
    if(!isValid){
        return res.status(400).json(msg);
    }

    const profileFields = {};
    profileFields.prodcutBanner = {};
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.bannerBg) profileFields.prodcutBanner.bannerBg = req.body.bannerBg;
    if(req.body.bannerName) profileFields.prodcutBanner.bannerName = req.body.bannerName;
    if(req.body.bannerSubName) profileFields.prodcutBanner.bannerSubName = req.body.bannerSubName;
    if(req.body.bannerFeather) profileFields.prodcutBanner.bannerFeather = req.body.bannerFeather;
    if(req.body.bannerLink) profileFields.prodcutBanner.bannerLink = req.body.bannerLink;


    HomeSchema.findOne({user: req.user.id}).then(profile => {
      if(profile){
        HomeSchema.findByIdAndUpdate({user: req.user.id},{$set:profileFields},{new:true}).then(profile => res.json(profile));
      }else{
        HomeSchema.findOne({handle:profileFields.handle}).then(profile => {
            if(profile){
                msg.handle = "该用户的handle个人信息已经存在,请勿重新创建!";
                res.status(400).json(msg);
            }
            new HomeSchema(profileFields).save().then(profile => res.json(profile));
        })
      }
    })
});

/** 
 * POST api/anviz/home/prodcut
 * 添加 热销产品
 * 根据 token 
*/

router.post('/prodcut',passportInfo,(req,res) => {
    const {msg,isValid} = homeProdcutValidator(req.body);
    if(!isValid){
      return res.status(400).json(msg);
    }
    
    HomeSchema.findOne({user:req.user.userId})
        .then(profile => {
          console.log('current:   ' + profile);
    
          //根据Model 数据模型组织数据
          const newProdcut = {
            prodctName:req.body.prodctName,
            prodctSubTitel:req.body.prodctSubTitel,
            prodctDes:req.body.prodctDes,
            prodctLink:req.body.prodctLink,
            prodctImg:req.body.prodctImg,
            prodctFeature:req.body.prodctFeature
          };

          if(typeof req.body.prodctFeature !== "undefined"){
            newProdcut.prodctFeature = req.body.prodctFeature.split(",");
          }

          console.log('newProdcut:    ' + JSON.stringify(newProdcut));
          profile.prodcutList.unshift(newProdcut);
          console.log('profile:  ' + profile);
          profile.save().then(profile => res.json(profile));
        })
        .catch((err) => res.json(err));
    });


    /** 
 * POST api/anviz/home/case
 * 添加 展会，奖牌及产品分类
 * 根据 token 
*/

router.post('/case',passportInfo,(req,res) => {
    const {msg,isValid} = homeCaseValidator(req.body);
    if(!isValid){
      return res.status(400).json(msg);
    }
    
    HomeSchema.findOne({user:req.user.userId})
        .then(profile => {
          console.log('current:   ' + profile);
    
          //根据Model 数据模型组织数据
          const newCase = {
            caseImg:req.body.caseImg,
            caseTitle:req.body.caseTitle,
            caseSubTitle:req.body.caseSubTitle,
            caseLink:req.body.caseLink
          };

          profile.prodctCase.unshift(newCase);
          profile.save().then(profile => res.json(profile));
        })
        .catch((err) => res.json(err));
    });

module.exports = router;