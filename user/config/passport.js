/** 
 * 验证 token
 * 需要用到 passport-jwt . 从它的网站复制验证方法以及初始化的变量 JwtStrategy / opts / passport.use()
 * 需要用到 model ，连接数据库
 * 需要用到自琯义的 keys
*/
const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require('mongoose');
const UserModel = mongoose.model('users');
const keys = require('../config/key');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretName;

module.exports = passport => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        console.log(jwt_payload);
        //jwt_payload 就是认证过的一个 token
        UserModel.findOne(jwt_payload._id).then(user =>{
            if(user){
                return done(null,user);
            }{
                return done(null,false);
            }
        }).catch(err => console.log(err))
    }));
}