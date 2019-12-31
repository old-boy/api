const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.SchemaTypes.ObjectId;

const ProductTagSchema = new Schema({
    tagId: {
        type: ObjectId,
        index: true
    },
    tagName: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model("productTags", ProductTagSchema);