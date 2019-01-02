const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UtecHomeSchema = new Schema({
    prodctScene:{
        isScene:{
            type:Boolean
        },
        learnmoreLink:{
            type:String,
            required:true
        },
        backDoor:{
            backBgUrl:{
                type:String,
                required:true
            },
            backDoorUrl:{
                type:String,
                required:true
            },
            backTitle:{
                type:String,
                required:true
            },
            backAppUrl:{
                type:String,
                required:true
            }
        },
        frontDoor:{
            frontBgUrl:{
                type:String,
                required:true
            },
            frontDoorUrl:{
                type:String,
                required:true
            },
            frontTitle:{
                type:String,
                required:true
            },
            frontAppUrl:{
                type:String,
                required:true
            }
        }
    },
    productMark:{
        markbg:{
            type:String,
            required:true
        },
        markList:{
            type:[String],
            required:true
        }
    },
    productCategory:{
        type:[String],
        required:true
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = UtecHome = mongoose.model('utecHome',UtecHomeSchema);