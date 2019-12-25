const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ProdctSchema = new Schema({
    productName: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    productModelName: {
        type: String,
        required: true
    },
    productThumb: {
        type: String,
        required: true
    },
    moduleId: {
        type: ObjectId,
        ref: "productModules"
    },
    tagId: {
        type: ObjectId,
        ref: "productTags"
    },
    templateId: {
        type: ObjectId,
        ref: "productTemplate"
    },
    sellStatusId: {
        type: ObjectId,
        ref: "SellStatus"
    },
    parameters: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    feature: {
        type: String
    },
    application: {
        type: String
    },
    // pictureId: {
    //     type: mongoose.SchemaTypes.ObjectId
    // },
    // seoId: {
    //     type: mongoose.SchemaTypes.ObjectId
    // },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Product", ProdctSchema);