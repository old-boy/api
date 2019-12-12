const express = require("express");
const passport = require("passport");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const UserModel = require("../../models/user/User");
const router = express.Router();

const passportInfo = passport.authenticate('jwt', { session: false });


// 查询所有用户
router.get('/', (req, res) => {
    UserModel.find().then(user => {
        res.json(user);
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })
});

// 根据 userName 查询用户
// localhost:3000/api/user/ct
router.get('/:userName', (req, res) => {
    // res.send('OK')
    var self = this;
    const userName = `${req.params.userName}`;
    console.log(userName);
    UserModel.findOne({ "userName": userName }).then((user) => {
        if (user) {
            res.json(user);
        } else {
            return res.status(404).json({ userId: "用户不存在" });
        }
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })
});

// 添加新用户
router.post('/add', (req, res) => {
    UserModel.findOne({ userEmail: req.body.userEmail }).then((user) => {
        if (user) {
            return res.status(400).json({ userEmail: "邮箱巳被注册" });
        } else {
            const placeArr = [];
            const province = req.body.province;
            const city = req.body.city;
            const placeEntity = {
                province,
                city
            };
            placeArr.push(placeEntity);

            const newUser = new UserModel({
                userId: req.body.userId,
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                userPassword: req.body.userPassword,
                userAge: req.body.userAge,
                userAvatar: req.body.userAvatar,
                place: placeArr
            });

            //给 newUser.userPassword 加密,hash 为加密后的密码
            bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(newUser.userPassword, salt, (err, hash) => {
                    if (err) throw err;

                    newUser.userPassword = hash;

                    //保存到数据库
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                });
            });
        }
    });
});

// 登录
router.post('/login', (req, res) => {
    const userEmail = req.body.userEmail;
    const userPassword = req.body.userPassword;

    UserModel.findOne({ userEmail: req.body.userEmail }).then((user) => {
        console.log(user);
        if (!user) {
            return res.status(404).json({ userName: "用户不存在" });
        };

        // 密码匹配, comparePassword 为 UserModel 的实例方法
        user.comparePassword(userPassword, (err, isMatch) => {
            if (err) {
                console.log(err)
            };
            // console.log(isMatch)
            if (isMatch) {
                // return res.redirect('/') 301
                // 登录成功后，将当前 user 保存在 session 中
                req.session.user = user;
                console.log(req.session.user);
                return res.json({ message: "登录成功" });
            } else {
                res.json('password is not matched!')
            }
        })
    })
});



// 退出
router.get('/signout', (req, res) => {
    req.session = null;
    if (req.session == null || req.session == '') {
        req.json({ userName: "巳退出" })
        console.log(req.session.user);
    }
})

// 根据 ID 更新数据
router.post('/:id', (req, res, next) => {
    const userId = `${req.params.id}`;
    UserModel.findByIdAndUpdate({ userId }, req.body, (err, user) => {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.json({ message: "更新成功" })
        }
    })
});

// 删除用户
router.delete('/:id', (req, res) => {
    const id = `${req.params.id}`;
    UserModel.findById({ _id: id }).then((id) => {
        if (id) {
            UserModel.deleteOne({ _id: id }).then(user => res.status(200).json({ "_id": "删除成功" })).catch(err => console.log(err));
        } else {
            return res.status(404).json({ _id: "用户不存在" })
        }
    })
});

module.exports = router;