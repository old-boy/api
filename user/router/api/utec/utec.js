const express = require('express');
const router = express.Router();
const passport = require("passport");

const UtecHomeSchema = require('../../../models/UtecHome');

const passportSubmit = passport.authenticate('jwt',{ session: false });

/** 
 * GET api/utec
 * 测试当前接口返回的 josn 数据
 * 公用
*/
router.get('/test',(req,res) => {
    res.json({msg:'this is utec!!'})
});

/** 
 * GET api/utec/getScene
 * 查询首页轮播数据
 * 首页
*/
router.get('/getScene',(req,res) => {
    let msg = {};
    UtecHomeSchema.findOne({learnmoreLink:req.body.learnmoreLink})
                  .populate('isScene','learnmoreLink','backDoor','frontDoor')
                  .then((product) => {
                      if(!product){
                          return res.status(404).json({msg:'不存在此场景！'})
                      }

                      res.json(product);
                  }).catch(err =>{
                      res.status(404).json({msg:'不存在此场景!'})
                  });
                  
});

/** 
 * POST api/utec/setgetScene
 * 添加或修改首页轮播数据
 * 首页
*/
router.post('/setgetScene',passportSubmit,(req,res) => {
    let msg = {};
    //组织传过来的数据

    //查询是否有 isScene 字段
    UtecHomeSchema.findOne({isScene:req.body.isScene}).then((scene) => {
        if(scene){
            //如果存在，则更新
        }else{
            //如果不存在，则保存
        }
    })
});

module.exports = router;