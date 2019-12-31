const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const productModule = express.Router();
const productModel = require('../../models/product/Modules');


// url/id  params.id
// url?id=id  query.id
// form post  body.id
productModule.route('/modules')
    // get
    .get((req, res) => {
        productModel.find().then(module => {
            res.json(module);
        }).catch(err => {
            res.status(500).json({ message: err.message })
        });
    })
    // add
    .post((req, res) => {
        productModel.findOne({ moduleName: req.body.moduleName }).then((module) => {
            if (module) {
                return res.status(500).json({ moduleName: "moduleName 巳存在！" });
            } else {
                const moduleName = req.body.moduleName;
                const moduleClassName = req.body.moduleClassName;

                const newModule = new productModel({
                    moduleName,
                    moduleClassName
                });

                newModule.save().then(module => res.json(module)).catch(err => console.log(err));
            }
        })
    })



productModule.route('/modules/:id')
    // update
    .post((req, res) => {
        const _id = `${req.params.id}`;
        const updateData = req.body;

        productModel.findByIdAndUpdate({ _id }, updateData, (err, module) => {
            if (err) {
                res.status(500).json({ error: err });
            } else {
                res.status(200).json(module)
            }
        })
    })
    // delete
    .delete((req, res) => {
        var id = `${req.params.id}`;
        console.log(id)
        productModel.findById({ _id: id }).then((id) => {
            if (id) {
                productModel.deleteOne({ _id: id }).then(module => res.status(200).json(module));
            } else {
                return res.status(400).json({ "_id": "id不存在" })
            }
        }).catch(err => {
            console.log(err)
        })
    })

module.exports = productModule;