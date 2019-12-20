const express = require("express");
const templateRouter = express.Router();
const templateModel = require("../../models/product/TemplatePage");

templateRouter.route("/")
    .get((req, res) => {
        templateModel.find().then(template => {
            if (template.length == 0) {
                res.json({ message: "暂时没有添加数据" })
            } else {
                res.status(200).json(template)
            }
        }).catch(err => console.log(err))
    })

templateRouter.route("/add")
    .post((req, res) => {
        templateModel.findOne({ title: req.body.title }).then((title) => {
            if (title) {
                res.status(400).json({ message: "title 巳存在" })
            } else {
                var title = req.body.title;
                var seoName = req.body.seoName;
                var code = req.body.code;

                const newTemplate = new templateModel({
                    title,
                    seoName,
                    code
                });

                newTemplate.save().then(template => res.json(template)).catch(err => console.log(err))
            }
        })
    })

templateRouter.route("/:id")
    .post((req, res) => {
        var _id = `${req.params.id}`;
        templateModel.findByIdAndUpdate({ _id }, req.body, (err, template) => {
            if (err) {
                res.status(500).json({ message: err })
            } else {
                res.status(200).json({ message: "更新成功" })
            }
        })
    })
    .delete((req, res) => {
        var _id = `${req.params.id}`;
        templateModel.findById({ _id }).then((data) => {
            if (!data) {
                res.status(400).json({ message: "数据不存在" })
            } else {
                templateModel.deleteOne({ _id }).then(data => res.status(200).json({ message: "删除成功" })).catch(err => console.log(err))
            }
        })
    })


module.exports = templateRouter;