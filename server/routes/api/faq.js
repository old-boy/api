const express = require("express");
const faqRouter = express.Router();
const FaqModel = require('../../models/faq/Faq');

faqRouter.route('/')
    .get((req, res) => {
        FaqModel.find().populate("user").exec((err, doc) => {
            console.log(doc)
        })
    });
//get id

//get all
faqRouter.route('/all')
    .get((req, res) => {
        FaqModel.find().then((faq) => {
            res.send(faq)
        }).catch(err => console.log(err))
    })
    //add
faqRouter.route('/add')
    .post((req, res) => {
        FaqModel.findOne({ faqTitle: req.body.faqTitle }).then((faq) => {
            if (faq) {
                res.status(400).json({ message: "faq 巳存在" }).send(faq)
            } else {
                var faqTitle = req.body.faqTitle;
                var faqInformation = req.body.faqInformation;

                const newFaq = new FaqModel({
                    faqTitle,
                    faqInformation
                });

                newFaq.save().then(fag => res.json(fag)).catch(err => console.log(err));
            }
        })
    });

//update    
faqRouter.route('/:id')
    .post((req, res) => {
        var _id = `${req.params.id}`;
        FaqModel.findByIdAndUpdate({ _id }, req.body, (err, faq) => {
            if (err) {
                res.status(500).json({ message: err })
            } else {
                res.status(200).json({ message: "更新成功" })
            }
        })
    })
    .delete((req, res) => {
        var _id = `${req.params.id}`;
        FaqModel.findById({ _id }).then((faq) => {
            if (!faq) {
                res.status(400).json({ message: "faq 不存在" })
            } else {
                FaqModel.deleteOne({ _id }).then(faq => res.status(200).json({ message: "删除成功" })).catch(err => { console.log(err) })
            }
        })
    })

module.exports = faqRouter;