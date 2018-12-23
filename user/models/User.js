/**
 * models 是为了储存数据，储存数据就需要连接数据库，因此需要引入 mongoose ，
 * 并实例化一个 Schema 组件，Schema 组件是为了组织接口文件的数据类型
 */

 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 /**
  * 创建 Schema
  */
 const UserSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    userEmail:{
        type:String,
        required:true
    },
    userPassword:{
        type:String,
        required:true
    },
    userAvatar:{
        type:String
    },
    date:{
        type:Date,
        default:Date.now
    }
 });

 /**
  * 公开,将该 Schema 发布为 Model
  * mongoose.model() 第一个参数是操作的表，第二个参数是当前实例化的数据格式
  * 意思为 将当前名为 UserSchema 的Schema与存入数据库的表名绑定
  * users 为数据将要保存的表名
  */
 module.exports = User = mongoose.model("users",UserSchema);