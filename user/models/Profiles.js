 const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

 /**
  * 创建 Schema
  * 
  * Schema.Types.ObjectId 可以获取当前 user 的 id
  * ref:'users' 就是从 users 这个表中获取关联的数据
  * 
  * handle 会储存登录的用户名
  * userFriends 关联表返回的对象名称
  */
 const ProfilesSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"//这里要写你指向的数据库表名字
    },
    handle:{
        type:String,
        required:true,
        max:40
    },
    company:{
        type:String,
    },
    website:{
        type:String,
    },
    location:{
        type:String,
    },
    status:{
        type:String,
        required:true
    },
    skills:{
        type:[String],
        required:true
    },
    bio:{
        type:String
    },
    githubusername:{
        type:String
    },
    experience:[
    {
        current:{
            type:Boolean,
            default:true
        },
        title:{
            type:String,
            required:true
        },
        company:{
            type:String,
            required:true
        },
        location:{
            type:String,
        },
        from:{
            type:String,
            require:true
        },
        to:{
            type:String,
        },
        description:{
            type:String,
        },
    }
    ],
    education:[
    {
        current:{
            type:Boolean,
            default:true
        },
        school:{
            type:String,
            required:true
        },
        degree:{
            type:String,
            required:true
        },
        fieldofstudy:{
            type:String,
            required:true
        },
        from:{
            type:String,
            require:true
        },
        to:{
            type:String,
        },
        description:{
            type:String,
        },
    }
    ],
    social:{
        wechat:{
            type:String
        },
        QQ:{
            type:String
        },
        tengxunkt:{
            type:String
        },
        wangyikt:{
            type:String
        }
    },
    date:{
        type:Date,
        default:Date.now
    }
 });


 module.exports = Profiles = mongoose.model("profiles",ProfilesSchema);