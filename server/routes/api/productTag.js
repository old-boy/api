const express = require('express');
const tagRouter = express.Router();
const TagModel = require('../../models/product/Tag');


//get id
tagRouter.route('/tag/:id')
    .get((req, res) => {
        const _id = `${req.params.id}`;
        TagModel.findById({ _id }).then(tag => {
            res.send(tag)
        }).catch(err => {
            console.log(err)
        })
    })
tagRouter.route('/tag')
    .get((req, res) => {
        TagModel.find().then(tag => {
            res.send(tag)
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

                newTag.save().then(tag => res.send(tag)).catch(err => console.log(err));
            }
        })
    })
tagRouter.route("/tag/:name")
    .get((req, res) => {
        const tagName = `${req.params.tagName}`;
        TagModel.findOne({ tagName }).then((tag) => {
            if (!tag) {
                res.status(404).json({ message: "不存在" });
            } else {
                res.json(tag)
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
                res.status(200).send(tag);
            }
        })
    })
    .delete((req, res) => {
        const _id = `${req.params.id}`;
        TagModel.findById({ _id }).then((id) => {
            if (!id) {
                res.status(400).json({ message: "id不存在" })
            } else {
                TagModel.findByIdAndDelete({ _id }).then(tag => res.status(200).json({ message: "删除成功" }));
            }
        })
    })

module.exports = tagRouter;