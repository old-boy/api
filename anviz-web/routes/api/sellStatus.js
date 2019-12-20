const express = require("express");
const sellRouter = express.Router();
const sellModel = require("../../models/product/SellStatus");

sellRouter.route("/")
    .get((req, res) => {
        sellModel.find().then(sell => {
            if (sell.length == 0) {
                res.json({ message: "暂时没有添加数据" })
            } else {
                res.status(200).json(sell)
            }
        }).catch(err => {
            console.log(err)
        })
    })

sellRouter.route("/add")
    .post((req, res) => {
        sellModel.findOne({ statusName: req.body.statusName }).then((statusName) => {
            if (statusName) {
                res.status(400).json({ message: "当前状态巳存在" })
            } else {
                var statusName = req.body.statusName;

                var newSell = new sellModel({
                    statusName
                })

                newSell.save().then(sell => res.json({ message: "添加成功" })).catch(err => console.log(err))
            }
        })
    })

sellRouter.route('/:id')
    .post((req, res) => {
        var _id = `${req.params.id}`;
        sellModel.findByIdAndUpdate({ _id }, req.body, (err, sell) => {
            if (err) {
                res.status(500).json({ message: err })
            } else {
                res.status(200).json({ message: "更新成功" })
            }
        })
    })
    .delete((req, res) => {
        var _id = `${req.params.id}`;
        sellModel.findById({ _id }).then((sell) => {
            if (!sell) {
                res.status(400).json({ message: "status 不存在" })
            } else {
                sellModel.deleteOne({ _id }).then(sell => res.status(200).json({ message: "删除成功" })).catch(err => { console.log(err) })
            }
        })
    })

module.exports = sellRouter;