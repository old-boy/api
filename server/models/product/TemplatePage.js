const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TemplatePageModelSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    seoName: {
        type: String,
        unique: true
    },
    code: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("product_template", TemplatePageModelSchema)