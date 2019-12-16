const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
    by: {
        type: Schema.Types.ObjectId,
        ref: 'productTags'
    },
    faqTitle: {
        type: String,
        required: true
    },
    faqInformation: {
        type: String
    },
    pubDate: {
        type: Date,
        default: new Date()
    }
});

module.exports = faq = mongoose.model("productFaq", faqSchema);