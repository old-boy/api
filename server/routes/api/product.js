const express = require("express");
const productRouter = express.Router();
const productModel = require("../../models/product/Product");
const tagModel = require("../../models/product/Tag");
const moduleModel = require("../../models/product/Modules");
const templateModel = require("../../models/product/TemplatePage");
const sellModel = require("../../models/product/SellStatus");

productRouter.route('/')
    .get((req, res) => {
        productModel.find()
            .populate("moduleId", "moduleName moduleClassName -_id")
            .populate("tagId", "tagName -_id")
            .populate("templateId", "title -_id")
            .populate("sellStatusId", "statusName -_id")
            .exec((err, docs) => {
                if (err) {
                    res.status(400).json({ message: err })
                } else {
                    res.status(200).json(docs)
                }
            })
            // productModel.aggregate([{
            //     $lookup: {
            //         from: "productModules",
            //         localField: "moduleId",
            //         foreignField: "_id",
            //         as: "productModule"
            //     }
            // }, {
            //     $lookup: {
            //         from: "productTags",
            //         localField: "tagId",
            //         foreignField: "_id",
            //         as: "productTag"
            //     }
            // }, {
            //     $lookup: {
            //         from: "productTemplate",
            //         localField: "templateId",
            //         foreignField: "_id",
            //         as: "productTemplate"
            //     }
            // }, {
            //     $lookup: {
            //         from: "SellStatus",
            //         localField: "sellStatusId",
            //         foreignField: "_id",
            //         as: "SellStatus"
            //     }
            // }])
            // .then((product) => {
            //     if (product.length <= 0) {
            //         res.status(400).json({ message: "no data" })
            //     } else {
            //         res.status(200).json(product)
            //     }
            // }).catch(err => console.log(err))

    })

productRouter.route('/add')
    .post((req, res) => {
        productModel.findOne({ productName: req.body.productName }).then((product) => {
            if (product) {
                res.status(400).json({ message: "数据巳存在" });
            } else {
                var productName = req.body.productName;
                var productModelName = req.body.productModelName;
                var productThumb = req.body.productThumb;
                var parameters = req.body.parameters;
                var description = req.body.description;
                var feature = req.body.feature;
                var application = req.body.application;
                var moduleId = req.body.moduleId;
                var tagId = req.body.tagId;
                var templateId = req.body.templateId;
                var sellStatusId = req.body.sellStatusId;

                const newProduct = new productModel({
                    productName,
                    productModelName,
                    productThumb,
                    parameters,
                    description,
                    feature,
                    application,
                    moduleId,
                    tagId,
                    templateId,
                    sellStatusId
                });

                newProduct.save().then(product => res.json({ message: "添加成功" })).catch(err => console.log(err))
            }
        })
    })
productRouter.route("/:id")
    .delete((req, res) => {
        var _id = `${req.params.id}`;
        productModel.findByIdAndDelete({ _id }).then((product) => {
            if (!product) {
                res.status(400).json({ message: "product 不存在" })
            } else {
                productModel.deleteOne({ _id }).then(product => res.status(200).json({ message: "删除成功" })).catch(err => { console.log(err) })
            }
        })
    })


module.exports = productRouter;