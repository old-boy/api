const express = require('express');
const router = express.Router();
const passport = require("passport");
const mongoose = require('mongoose');

const ProfilesSchema = require('../../models/Profiles');
const UserSchema = require('../../models/User');

/** 
 * GET api/profile/test
 * 测试当前接口返回的 josn 数据
*/
router.get('/test',(req,res) => {
    res.json({msg:'this is profiles!!'})
});


module.exports = router;