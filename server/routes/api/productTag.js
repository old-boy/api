const express = require('express');
const tagRouter = express.Router();
const TagModel = require('../../models/product/Tag');

tagRouter.route('/tag')
    .get((req, res) => {
        TagModel.find().then(tag => {
            res.json(tag)
        }).catch(err => {
            console.log(err)
        })
    })
    .post((req, res) => {
        TagModel.findOne({ tagName: req.body.tagName }).then((tag) => {
            if (tag) {
                res.status(400).json({ message: "tag 巳存在" })
            } else {
                const tagName = req.body.tagName;
                const newTag = new TagModel({
                    tagName
                });

                newTag.save().then(tag => res.json(tag)).catch(err => console.log(err));
            }
        })
    })

tagRouter.route("/tag/:id")
    .post((req, res) => {
        const _id = `${req.params.id}`;
        TagModel.findByIdAndUpdate({ _id }, req.body, (err, tag) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json({ message: "更新成功" })
            }
        })
    })
    .delete((req, res) => {
        const _id = `${req.params.id}`;
        TagModel.findById({ _id }).then((id) => {
            if (!id) {
                res.status(400).json({ message: "id不存在" })
            } else {
                TagModel.deleteOne({ _id }).then(tag => res.status(200).json({ message: "删除成功" }));
            }
        })
    })

module.exports = tagRouter;