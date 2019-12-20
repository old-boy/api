const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const faqSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
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

faqSchema.static = {
    findTagWithFaq: function(cb) {
        return this
            .find()
            .populate('tagId') //注意这是联合查询的关键
            .sort('meta.updateAt')
            .exec(cb)
    }
}

module.exports = faq = mongoose.model("productFaq", faqSchema);