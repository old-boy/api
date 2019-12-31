const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    userId: {
        type: Number,
        required: true,
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userPassword: {
        type: String,
        required: true
    },
    userAvatar: {
        type: String
    },
    userAge: {
        type: String
    },
    place: [{
        province: {
            type: String
        },
        city: {
            type: String
        }
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

userSchema.methods = {
    comparePassword(_userPassword, cb) {
        // _userPassword  当前密码
        // this.userPassword 当前数据库中 user 对应的 密码
        bcrypt.compare(_userPassword, this.userPassword, (err, isMatch) => {
            if (err) return cb(err)
                // console.log(isMatch)
            cb(null, isMatch)
        });
    }
};

module.exports = User = mongoose.model("users", userSchema);