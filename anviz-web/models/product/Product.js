const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;
const productModulesSchema = new Schema({
    moduleId: {
        type: ObjectId,
        index: true
    },
    moduleName: {
        type: String,
        required: true
    },
    moduleClassName: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = ProductModule = mongoose.model("productModules", productModulesSchema);