const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"users"//这里要写你指向的数据库表名字，都是根据用户的 token 操作的
    },
    handle:{
        type:Boolean
    },
    prodcutBanner:{
        bannerBg:{
            type:String,
            required:true
        },
        bannerName:{
            type:String,
            required:true
        },
        bannerSubName:{
            type:String
        },
        bannerFeather:{
            type:String
        },
        bannerLink:{
            type:String
        }
    },
    prodcutList:[
        {
            prodctName:{
                type: String,
                required:true
            },
            prodctSubTitel:{
                type:String,
                required:true
            },
            prodctDes:{
                type:String,
                required:true
            },
            prodctLink:{
                type:String,
                required:true
            },
            prodctImg:{
                type:String,
                required:true
            },
            prodctFeature:[
                {
                    name:{
                        type:String
                    }
                }
            ]
        }
    ],
    prodctCase:[
        {
            caseImg:{
                type:String,
                required:true
            },
            caseTitle:{
                type:String,
                required:true
            },
            caseSubTitle:{
                type:String,
                required:true
            },
            caseLink:{
                type:String,
                required:true
            }
        }
    ]
});

module.exports = mongoose.model("home",HomeSchema);