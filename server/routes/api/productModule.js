const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const productModuleRouter = express.Router();
const productModuleModel = require('../../models/product/Modules');


// url/id  params.id
// url?id=id  query.id
// form post  body.id
productModuleRouter.route('/modules')
    // get
    .get((req, res) => {
        productModuleModel.find().then((module) => {
            res.send(module);
        }).catch(err => {
            res.status(500).json({ message: err.message })
        });
    })
    // add
    .post((req, res) => {
        productModuleModel.findOne({ moduleName: req.body.moduleName }).then((module) => {
            if (module) {
                return res.status(500).json({ moduleName: "moduleName 巳存在！" });
            } else {
                const moduleName = req.body.moduleName;
                const moduleClassName = req.body.moduleClassName;

                const newModule = new productModuleModel({
                    moduleName,
                    moduleClassName
                });

                newModule.save().then(module => res.send(module)).catch(err => console.log(err));
            }
        })
    })



productModuleRouter.route('/modules/:id')
    //get id
    .get((req,res) => {
        const _id = `${req.params.id}`;
        productModuleModel.findById({_id}).then((module) => {
            res.send(module)
        }).catch(err => console.log(err))
    })
    // update
    .post((req, res) => {
        const _id = `${req.params.id}`;
        const updateData = req.body;

        productModuleModel.findByIdAndUpdate({ _id }, updateData, (err, module) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).send(module)
            }
        })
    })
    // delete
    .delete((req, res) => {
        const _id = `${req.params.id}`;
        productModuleModel.findById({ _id }).then((id) => {
            if (!id) {
                res.status(400).json({ message: "id不存在" })
            } else {
                productModuleModel.findByIdAndDelete({ _id }).then(tag => res.status(200).json({ message: "删除成功" }));
            }
        })
    })

module.exports = productModuleRouter;